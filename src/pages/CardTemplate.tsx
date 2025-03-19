
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Heart,
  Mail,
  Package,
  ShoppingBag,
  ShoppingCart,
  UserCheck,
  Users,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import MetricCard from '@/components/dashboard/MetricCard';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const CardTemplate: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold tracking-tight">Templates de Cartões</h1>
        <p className="text-muted-foreground mt-1">Diferentes estilos de cartões para apresentação de dados</p>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6"
      >
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4">Cartões de Métricas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCard
              title="Usuários Ativos"
              metric="1,274"
              icon={<Users size={20} />}
              trend={{ value: 12, label: "desde o mês passado", isPositive: true }}
            />
            
            <MetricCard
              title="Receita Total"
              metric="R$ 24,895"
              icon={<DollarSign size={20} />}
              trend={{ value: 8, label: "desde o mês passado", isPositive: true }}
              variant="glass"
            />
            
            <MetricCard
              title="Pedidos Recebidos"
              metric="432"
              icon={<ShoppingCart size={20} />}
              trend={{ value: 4, label: "desde o mês passado", isPositive: true }}
            />
            
            <MetricCard
              title="Taxa de Conversão"
              metric="3.2%"
              icon={<BarChart3 size={20} />}
              trend={{ value: 0.5, label: "desde o mês passado", isPositive: false }}
              variant="glass"
            />
          </div>
        </motion.div>
        
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4">Cartões de Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="neo-morphism hover-lift">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Taxa de Cliques</CardTitle>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Activity size={20} />
                  </div>
                </div>
                <CardDescription>Desempenho das campanhas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24.8%</div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Campanha A</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <Progress value={32} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Campanha B</span>
                    <span className="font-medium">21%</span>
                  </div>
                  <Progress value={21} className="h-2" />
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Campanha C</span>
                    <span className="font-medium">14%</span>
                  </div>
                  <Progress value={14} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism hover-lift">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Últimos Pedidos</CardTitle>
                  <Badge variant="outline">24 novos</Badge>
                </div>
                <CardDescription>Pedidos mais recentes</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <ul className="divide-y divide-border">
                  {[
                    { id: "#1234", cliente: "João Silva", valor: "R$ 124,00", status: "Concluído" },
                    { id: "#1235", cliente: "Maria Santos", valor: "R$ 75,50", status: "Pendente" },
                    { id: "#1236", cliente: "Carlos Oliveira", valor: "R$ 249,90", status: "Concluído" },
                  ].map((pedido, index) => (
                    <li key={index} className="py-3 px-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{pedido.id}</div>
                          <div className="text-sm text-muted-foreground">{pedido.cliente}</div>
                        </div>
                        <div className="text-right">
                          <div>{pedido.valor}</div>
                          <div className={cn(
                            "text-xs",
                            pedido.status === "Concluído" ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                          )}>
                            {pedido.status}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-t border-border pt-4">
                <Button variant="ghost" size="sm" className="w-full text-primary">
                  Ver todos os pedidos
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="neo-morphism hover-lift">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Progresso de Metas</CardTitle>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 size={20} />
                  </div>
                </div>
                <CardDescription>Metas deste trimestre</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">Vendas</span>
                      <span>78%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-primary h-3 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">Clientes</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium">Receita</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div className="bg-amber-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border pt-4">
                <Button size="sm" className="w-full">Definir Novas Metas</Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
        
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4">Cartões de Informação</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="overflow-hidden neo-morphism hover-lift">
              <div className="h-36 bg-gradient-to-r from-primary to-primary/70"></div>
              <CardHeader className="-mt-12 relative">
                <div className="absolute -top-8 left-4 bg-card p-2 rounded-lg shadow-md">
                  <Package className="h-8 w-8 text-primary" />
                </div>
                <div className="pt-6">
                  <CardTitle className="text-lg">Gerenciamento de Produtos</CardTitle>
                  <CardDescription>
                    Adicione, edite e remova produtos do catálogo
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div>
                    <div className="text-muted-foreground">Total de Produtos</div>
                    <div className="text-2xl font-semibold">1,234</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Categorias</div>
                    <div className="text-2xl font-semibold">18</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border flex justify-between">
                <Button variant="ghost" size="sm">Ver Detalhes</Button>
                <Button size="sm">Gerenciar</Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden glass-morphism border-0 hover-lift">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">E-mails Marketing</CardTitle>
                    <CardDescription>
                      Status das campanhas de e-mail
                    </CardDescription>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Mail size={20} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div>
                    <div className="text-muted-foreground text-sm">E-mails Enviados</div>
                    <div className="text-2xl font-semibold">15,492</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Taxa de Abertura</div>
                    <div className="text-2xl font-semibold">32.4%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Taxa de Cliques</div>
                    <div className="text-2xl font-semibold">12.8%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground text-sm">Conversões</div>
                    <div className="text-2xl font-semibold">684</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/10 flex justify-end">
                <Button className="bg-white/20 text-white hover:bg-white/30">Ver Relatório</Button>
              </CardFooter>
            </Card>
            
            <Card className="overflow-hidden neo-morphism hover-lift relative">
              <div className="absolute top-0 right-0 p-4">
                <Badge variant="outline">Pro</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Análise de Clientes</CardTitle>
                <CardDescription>
                  Insights sobre sua base de clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <UserCheck size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Clientes Ativos</div>
                      <div className="text-lg font-medium">9,842</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Compras por Cliente</div>
                      <div className="text-lg font-medium">2.8</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Heart size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Taxa de Retenção</div>
                      <div className="text-lg font-medium">68%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4">Cartões de Atividade</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="neo-morphism hover-lift">
              <CardHeader>
                <CardTitle className="text-lg">Atividades Recentes</CardTitle>
                <CardDescription>Últimas ações no sistema</CardDescription>
              </CardHeader>
              <CardContent className="px-2 overflow-hidden">
                <div className="relative pl-6 before:absolute before:left-2 before:top-0 before:h-full before:w-px before:bg-border">
                  {[
                    { icon: <Users size={14} />, title: "Novo usuário registrado", time: "2 minutos atrás", description: "João Silva criou uma nova conta" },
                    { icon: <ShoppingCart size={14} />, title: "Novo pedido (#1234)", time: "1 hora atrás", description: "Maria Santos comprou 3 produtos" },
                    { icon: <Package size={14} />, title: "Produto atualizado", time: "3 horas atrás", description: "Estoque do Laptop Pro X foi atualizado" },
                    { icon: <CreditCard size={14} />, title: "Pagamento recebido", time: "5 horas atrás", description: "Pedido #1230 foi pago via cartão" },
                    { icon: <FileText size={14} />, title: "Relatório gerado", time: "1 dia atrás", description: "Relatório mensal de vendas está disponível" },
                  ].map((activity, index) => (
                    <div key={index} className="mb-4 relative">
                      <div className="absolute -left-6 top-1 h-4 w-4 rounded-full bg-card shadow border border-border flex items-center justify-center text-primary">
                        {activity.icon}
                      </div>
                      <div className="py-1">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-medium">{activity.title}</h5>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-border">
                <Button variant="ghost" size="sm" className="w-full">
                  Ver Todas Atividades
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="neo-morphism hover-lift">
              <CardHeader>
                <CardTitle className="text-lg">Calendário de Eventos</CardTitle>
                <CardDescription>Próximos eventos agendados</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-4">
                  {[
                    { title: "Reunião com Fornecedores", date: "Hoje", time: "14:00 - 15:30", type: "Reunião" },
                    { title: "Lançamento de Produto", date: "Amanhã", time: "10:00 - 12:00", type: "Evento" },
                    { title: "Revisão de Marketing", date: "23/05/2023", time: "09:30 - 11:00", type: "Reunião" },
                    { title: "Treinamento da Equipe", date: "25/05/2023", time: "13:00 - 17:00", type: "Treinamento" },
                  ].map((event, index) => (
                    <div key={index} className="flex items-start gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
                      <div className="h-12 w-12 rounded-md bg-primary/10 flex flex-col items-center justify-center text-primary">
                        <CalendarDays size={16} className="mb-1" />
                        <span className="text-xs font-medium">{event.date.includes('/') ? event.date.split('/')[0] : 'Hoje'}</span>
                      </div>
                      <div className="flex-1">
                        <h5 className="text-sm font-medium">{event.title}</h5>
                        <div className="flex items-center mt-1">
                          <Clock size={12} className="text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">{event.time}</span>
                        </div>
                        <Badge variant="outline" className="mt-2 text-xs">{event.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-border">
                <Button variant="outline" size="sm" className="mr-2">
                  <Calendar size={14} className="mr-1" />
                  Calendário
                </Button>
                <Button size="sm">
                  Novo Evento
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
        
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4">Cartões de Relatório</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="neo-morphism hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Relatório de Vendas</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download size={14} className="mr-1" />
                    Exportar
                  </Button>
                </div>
                <CardDescription>Resumo do desempenho de vendas do mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Vendas Totais</div>
                      <div className="text-2xl font-semibold mt-1">R$ 84,293</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">+12% desde o mês passado</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Pedidos</div>
                      <div className="text-2xl font-semibold mt-1">432</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">+8% desde o mês passado</div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Desempenho por Categoria</div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Eletrônicos</span>
                          <span>R$ 32,420</span>
                        </div>
                        <Progress value={38} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Móveis</span>
                          <span>R$ 18,732</span>
                        </div>
                        <Progress value={22} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Roupas</span>
                          <span>R$ 24,981</span>
                        </div>
                        <Progress value={30} className="h-2" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Outros</span>
                          <span>R$ 8,160</span>
                        </div>
                        <Progress value={10} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="neo-morphism hover-lift">
              <CardHeader>
                <CardTitle className="text-lg">Equipe de Vendas</CardTitle>
                <CardDescription>Desempenho dos vendedores do mês</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-2">
                  {[
                    { name: "Ana Silva", avatar: "A", role: "Gerente de Vendas", sales: "R$ 24,580", performance: 92 },
                    { name: "Bruno Costa", avatar: "B", role: "Consultor Sênior", sales: "R$ 18,230", performance: 78 },
                    { name: "Carla Santos", avatar: "C", role: "Consultor", sales: "R$ 14,850", performance: 65 },
                    { name: "Diego Oliveira", avatar: "D", role: "Consultor", sales: "R$ 12,390", performance: 52 },
                    { name: "Elaine Lima", avatar: "E", role: "Consultor Júnior", sales: "R$ 9,840", performance: 38 },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted/50 transition-colors">
                      <Avatar>
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-sm font-medium truncate">{member.name}</h5>
                          <span className="text-sm font-medium">{member.sales}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{member.role}</span>
                          <span className="text-xs text-muted-foreground">{member.performance}%</span>
                        </div>
                        <Progress value={member.performance} className="h-1 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-border">
                <Button size="sm" className="w-full">Ver Relatório Completo</Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default CardTemplate;
