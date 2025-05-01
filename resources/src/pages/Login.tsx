
import React from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../hooks/use-toast";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Music } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const formSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, user } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user && !isLoggingIn) {
      console.log("Usuário já está logado, redirecionando para /music-management");
      navigate("/music-management", { replace: true });
    }
  }, [user, navigate, isLoggingIn]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoggingIn(true);
      console.log("Tentando fazer login com:", values.email);
      
      const user = await login(values.email, values.password);
      console.log("Login realizado com sucesso:", user);
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao sistema de gestão musical",
      });
      
      console.log("Navegando para /music-management após login bem-sucedido");
      navigate("/music-management", { replace: true });
    } catch (error) {
      console.error("Erro no login:", error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Email ou senha incorretos",
      });
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/50 p-4">
      <Card className="w-full max-w-md mb-8">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Music className="text-primary-foreground h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Música Igreja</CardTitle>
          <CardDescription>
            Faça login para acessar o sistema de gestão musical
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu.email@igreja.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Sistema de gerenciamento musical para igrejas
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
