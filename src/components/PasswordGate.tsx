import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const CORRECT_PASSWORD = "protopo";

interface PasswordGateProps {
  children: React.ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("marcacoes_auth") === "true");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem("marcacoes_auth", "true");
      setUnlocked(true);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 text-center">
        <Lock className="w-10 h-10 mx-auto text-muted-foreground" />
        <h1 className="font-heading font-bold text-xl text-foreground">Área reservada</h1>
        <p className="text-sm text-muted-foreground">Introduz a palavra-passe para aceder às marcações.</p>
        <Input
          type="password"
          placeholder="Palavra-passe"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(false); }}
          autoFocus
        />
        {error && <p className="text-sm text-destructive">Palavra-passe incorreta.</p>}
        <Button type="submit" className="w-full">Entrar</Button>
      </form>
    </div>
  );
};

export default PasswordGate;
