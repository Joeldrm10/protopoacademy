const WHATSAPP_NUMBER = "351911102405";
export const EMAIL = "protopoacademy@gmail.com";
export const INSTAGRAM_HANDLE = "protopo_academy";
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
export const LOCATION = "Campo da Caridade, Ourém";

const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const WHATSAPP_NUMBER_EXPORT = WHATSAPP_NUMBER;
export const WHATSAPP_URL_GERAL = wa("Olá! Gostaria de esclarecer algumas dúvidas sobre o Footcamp Outono 2026.");
export const WHATSAPP_URL_MARCAR = wa("Olá! Vi o site da ProTopo Academy e gostaria de obter mais informações sobre o Footcamp Outono 2026.");
export const WHATSAPP_URL_DUVIDAS = wa("Olá! Tenho algumas dúvidas sobre o Footcamp Outono 2026.");
export const WHATSAPP_URL_PLANOS = wa("Olá! Tenho interesse no Footcamp Outono 2026 e gostaria de receber mais informações.");
export const WHATSAPP_URL_DIRETO = wa("Olá! Pretendo inscrever um atleta no Footcamp Outono 2026.");
export const EMAIL_URL_GERAL = `mailto:${EMAIL}?subject=Pedido%20de%20informa%C3%A7%C3%A3o&body=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20Footcamp%20Outono%202026.`;
export const EMAIL_URL_DADOS = `mailto:${EMAIL}?subject=Pedido%20relativo%20a%20dados%20pessoais`;
export const WHATSAPP_URL_FOOTCAMP_INFO = wa("Olá! Tenho interesse no Footcamp Outono 2026 e gostaria de receber mais informações.");
export const WHATSAPP_URL_PROXIMA_EDICAO = wa("Olá! Gostaria de receber mais informações sobre o Footcamp Outono 2026.");

