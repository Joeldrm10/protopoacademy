import { describe, expect, it, vi } from "vitest";
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
import { footcampSignupSchema } from "@/components/FootcampSignupForm";

const valid = {
  nome: "Atleta Teste", data_nascimento: "2015-05-10", idade: "11", clube_atual: "Clube Teste",
  posicao: "Defesa", escalao: "Infantil", encarregado: "Responsável Teste", telemovel: "912345678",
  email_encarregado: "teste@example.com", emergencia_nome: "Contacto Teste", emergencia_parentesco: "Pai",
  emergencia_telemovel: "912345679", semanas: ["outono"], participacao: "primeira",
  aceita_termos: true, consentimento: true, tamanho_tshirt: "M", tamanho_calcas: "S",
  autorizacao_imagem: "nao", tem_alergias: "nao", toma_medicacao: "nao", restricao_alimentar: "nao",
};
describe("Footcamp registration validation", () => {
  it("allows refusal of image permission independently of terms", () => expect(footcampSignupSchema.safeParse(valid).success).toBe(true));
  it("requires terms even when image permission is granted", () => expect(footcampSignupSchema.safeParse({...valid, autorizacao_imagem:"sim", aceita_termos:false}).success).toBe(false));
  it("requires data consent", () => expect(footcampSignupSchema.safeParse({...valid, consentimento:false}).success).toBe(false));
  it("requires both sizes for new athletes", () => {
    expect(footcampSignupSchema.safeParse({...valid, tamanho_tshirt:undefined}).success).toBe(false);
    expect(footcampSignupSchema.safeParse({...valid, tamanho_calcas:undefined}).success).toBe(false);
  });
  it("allows previous athletes without sizes", () => expect(footcampSignupSchema.safeParse({...valid, participacao:"anterior", tamanho_tshirt:undefined,tamanho_calcas:undefined}).success).toBe(true));
  it("retains previously entered sizes", () => {
    const result = footcampSignupSchema.parse({...valid,participacao:"anterior"});
    expect(result.tamanho_tshirt).toBe("M"); expect(result.tamanho_calcas).toBe("S");
  });
  it("requires named siblings when a discount is requested", () => expect(footcampSignupSchema.safeParse({...valid,irmaos:true,nome_irmaos:""}).success).toBe(false));
  it.each(["alergias", "medicacao", "alimentar"])("requires details for %s", (kind) => {
    const fields = kind === "alergias" ? {tem_alergias:"sim"} : kind === "medicacao" ? {toma_medicacao:"sim"} : {restricao_alimentar:"sim"};
    expect(footcampSignupSchema.safeParse({...valid,...fields}).success).toBe(false);
  });
  it("rejects invalid contact and age", () => {
    expect(footcampSignupSchema.safeParse({...valid,telemovel:"123"}).success).toBe(false);
    expect(footcampSignupSchema.safeParse({...valid,data_nascimento:"2025-01-01"}).success).toBe(false);
  });
});