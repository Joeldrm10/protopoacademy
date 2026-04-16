import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff } from "lucide-react";

const CORRECT_PASSWORD = "protopo";

interface PasswordGateProps {
  children: (onLogout: () => void) => React.ReactNode;
}

const PasswordGate = ({ children }: PasswordGateProps) => {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("marcacoes_auth") === "true");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogout = () => {
    sessionStorage.removeItem("marcacoes_auth");
    setUnlocked(false);
  };

  if (unlocked) return <>{children(handleLogout)}</>;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 text-center">
        <Lock className="w-10 h-10 mx-auto text-muted-foreground" />
        <h1 className="font-heading font-bold text-xl text-foreground">Área reservada</h1>
        <p className="text-sm text-muted-foreground">Introduz a palavra-passe para aceder às marcações.</p>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Palavra-passe"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            autoFocus
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {error && <p className="text-sm text-destructive">Palavra-passe incorreta.</p>}
        <Button type="submit" className="w-full">Entrar</Button>
      </form>
    </div>
  );
};

export default PasswordGate;
