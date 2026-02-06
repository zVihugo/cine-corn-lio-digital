import { useState } from "react";
import { Lock, LogIn, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const ADMIN_EMAIL = "admin@cinecornelio.com";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password.trim()) {
      toast({
        title: "Erro",
        description: "Digite a senha de administrador.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signIn(ADMIN_EMAIL, password);
      toast({
        title: "Login realizado",
        description: "Bem-vindo ao painel administrativo!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Acesso negado",
        description: "Senha incorreta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-strong rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
            <p className="text-muted-foreground mt-2">
              Digite a senha para acessar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password">Senha do Administrador</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite a senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoFocus
              />
            </div>

            <Button
              type="submit"
              variant="gold"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Acesso restrito a administradores autorizados
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
