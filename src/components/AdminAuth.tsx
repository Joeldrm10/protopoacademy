import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth = ({ onAuthenticated }: AdminAuthProps) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("Credenciais inválidas. Verifica o email e a palavra-passe.");
        setLoading(false);
        return;
      }
      onAuthenticated();
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/marcacoes` },
      });
      if (error) {
        toast.error(error.message.includes("registered") ? "Este email já está registado." : "Erro ao criar conta.");
        setLoading(false);
        return;
      }
      toast.success("Conta criada! Já podes entrar.");
      setMode("login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 text-center">
        <Lock className="w-10 h-10 mx-auto text-muted-foreground" />
        <h1 className="font-heading font-bold text-xl text-foreground">
          {mode === "login" ? "Área reservada" : "Criar conta"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === "login"
            ? "Inicia sessão para aceder ao painel de marcações."
            : "Regista uma nova conta de administrador."}
        </p>

        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-9"
            autoFocus
            required
          />
        </div>

        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Palavra-passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
          {loading
            ? mode === "login" ? "A entrar..." : "A criar..."
            : mode === "login" ? "Entrar" : "Criar conta"}
        </Button>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          {mode === "login" ? "Não tens conta? Criar conta" : "Já tens conta? Entrar"}
        </button>
      </form>
    </div>
  );
};

export default AdminAuth;
