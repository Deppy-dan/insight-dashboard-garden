
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  DollarSign, 
  Heart, 
  LineChart, 
  PieChart, 
  ShoppingCart, 
  TrendingDown,
  TrendingUp,
  Users 
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import MetricCard from '@/components/dashboard/MetricCard';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const StatTemplate: React.FC = () => {
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
        <h1 className="text-2xl font-display font-semibold tracking-tight">Templates de Estatísticas</h1>
        <p className="text-muted-foreground mt-1">Diferentes estilos de cartões estatísticos e indicadores</p>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6"
      >
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4">Cartões de Estatísticas Básicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard
              title="Usuários"
              value="1,274"
              variant="default"
              trend={{ value: 12, isPositive: true }}
              icon={<Users size={20} />}
            />
            
            <StatCard
              title="Receita"
              value="R$ 24,895"
              variant="glass"
              trend={{ value: 8, isPositive: true }}
              icon={<DollarSign size={20} />}
            />
            
            <StatCard
              title="Vendas"
              value="432"
              variant="blue"
              trend={{ value: 4, isPositive: true }}
              icon={<ShoppingCart size={20} />}
            />
            
            <StatCard
              title="Conversão"
              value="3.2%"
              variant="purple"
              trend={{ value: 0.5, isPositive: false }}
              icon={<BarChart3 size={20} />}
            />
          </div>
        </motion.div>
        
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4">Cartões de Métricas com Tendências</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCard
              title="Visitantes"
              metric="14,328"
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
              title="Pedidos"
              metric="432"
              icon={<ShoppingCart size={20} />}
              trend={{ value: 4, label: "desde o mês passado", isPositive: true }}
            />
            
            <MetricCard
              title="Taxa de Conversão"
              metric="3.2%"
              icon={<LineChart size={20} />}
              trend={{ value: 0.5, label: "desde o mês passado", isPositive: false }}
              variant="glass"
            />
          </div>
        </motion.div>
        
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4">Indicadores Comparativos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { title: "Tráfego de Usuários", current: 14328, previous: 12458, icon: <Users size={18} /> },
              { title: "Receita Mensal", current: 24895, previous: 22120, prefix: "R$ ", icon: <DollarSign size={18} /> },
              { title: "Taxa de Conversão", current: 3.2, previous: 3.4, suffix: "%", icon: <TrendingUp size={18} /> },
            ].map((metric, index) => {
              const isPositive = metric.current > metric.previous;
              const percentChange = ((metric.current - metric.previous) / metric.previous * 100).toFixed(1);
              
              const format = (value: number) => {
                let formatted = value.toString();
                if (value >= 1000) {
                  formatted = value.toLocaleString('pt-BR');
                }
                return (metric.prefix || '') + formatted + (metric.suffix || '');
              };
            
              return (
                <Card key={index} className="neo-morphism hover-lift overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-medium">{metric.title}</CardTitle>
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {metric.icon}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{format(metric.current)}</div>
                    <div className="flex items-center mt-2">
                      {isPositive ? (
                        <TrendingUp size={16} className="text-emerald-500 mr-1" />
                      ) : (
                        <TrendingDown size={16} className="text-red-500 mr-1" />
                      )}
                      <span className={isPositive ? "text-emerald-500" : "text-red-500"}>
                        {isPositive ? '+' : ''}{percentChange}%
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">vs. período anterior</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="text-xs text-muted-foreground mb-1">Comparação</div>
                      <div className="flex items-center w-full">
                        <div 
                          className={cn(
                            "h-2 rounded-l",
                            isPositive ? "bg-emerald-500" : "bg-primary"
                          )}
                          style={{ width: `${(metric.previous / (metric.current + metric.previous)) * 100}%` }}
                        ></div>
                        <div 
                          className={cn(
                            "h-2 rounded-r",
                            isPositive ? "bg-primary" : "bg-red-500"
                          )}
                          style={{ width: `${(metric.current / (metric.current + metric.previous)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Anterior: {format(metric.previous)}</span>
                        <span>Atual: {format(metric.current)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
        
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4">Indicadores de Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { title: "Taxa de Cliques", value: 24.8, target: 20, icon: <LineChart />, isGood: true },
              { title: "Tempo Médio", value: 3.4, target: 2.5, suffix: " min", icon: <BarChart3 />, isGood: false },
              { title: "Abandono", value: 18.2, target: 25, suffix: "%", icon: <ShoppingCart />, isGood: true },
              { title: "Retenção", value: 68.4, target: 75, suffix: "%", icon: <Heart />, isGood: false },
            ].map((metric, index) => {
              const percentage = (metric.value / metric.target) * 100;
              const isPositive = metric.isGood 
                ? metric.value > metric.target 
                : metric.value < metric.target;
              
              return (
                <Card key={index} className="neo-morphism hover-lift">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-medium">{metric.title}</CardTitle>
                      <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                        {metric.icon}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">
                      {metric.value}{metric.suffix || ''}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Meta: {metric.target}{metric.suffix || ''}
                    </div>
                    <div className="mt-4">
                      <Progress 
                        value={Math.min(percentage, 100)} 
                        className={cn(
                          "h-2",
                          isPositive ? "text-emerald-500" : "text-amber-500"
                        )}
                      />
                      <div className="flex justify-between items-center mt-1">
                        <span className={cn(
                          "text-xs flex items-center",
                          isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                        )}>
                          {isPositive ? (
                            <TrendingUp size={12} className="mr-1" />
                          ) : (
                            <TrendingDown size={12} className="mr-1" />
                          )}
                          {percentage.toFixed(0)}% da meta
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {isPositive ? 'Bom' : 'Precisa melhorar'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
        
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4">Análise de Canais</h2>
          <div className="grid grid-cols-1 gap-6 mb-6">
            <Card className="neo-morphism hover-lift">
              <CardHeader>
                <CardTitle className="text-lg">Origem de Tráfego</CardTitle>
                <CardDescription>Análise de canais de aquisição de visitantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-1 md:col-span-2 space-y-4">
                    {[
                      { name: "Pesquisa Orgânica", value: 42.8, visitors: 6132, color: "bg-primary" },
                      { name: "Redes Sociais", value: 27.4, visitors: 3924, color: "bg-purple-500" },
                      { name: "E-mail Marketing", value: 14.6, visitors: 2090, color: "bg-emerald-500" },
                      { name: "Referência", value: 8.3, visitors: 1188, color: "bg-amber-500" },
                      { name: "Direto", value: 6.9, visitors: 988, color: "bg-blue-500" },
                    ].map((channel, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${channel.color} mr-2`}></div>
                            <span>{channel.name}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span>{channel.visitors.toLocaleString()}</span>
                            <span className="font-semibold">{channel.value}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div className={`${channel.color} h-1.5 rounded-full`} style={{ width: `${channel.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="relative h-48 w-48">
                      <PieChart className="text-muted absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-12 w-12" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold">14,328</span>
                        <span className="text-sm text-muted-foreground">Total de Visitas</span>
                      </div>
                      <svg viewBox="0 0 100 100" className="absolute inset-0">
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="#f3f4f6" 
                          strokeWidth="7" 
                          strokeDasharray="283" 
                          strokeDashoffset="0"
                          transform="rotate(-90, 50, 50)"
                        />
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth="7" 
                          strokeDasharray="283" 
                          strokeDashoffset="162"
                          strokeLinecap="round"
                          transform="rotate(-90, 50, 50)"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
        
        <motion.div variants={item}>
          <h2 className="text-xl font-semibold mb-4">Estatísticas de Comparação</h2>
          <Card className="neo-morphism hover-lift overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Comparativo Trimestral</CardTitle>
              <CardDescription>
                Análise comparativa dos principais indicadores nos últimos quatro trimestres
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="py-3 px-4 text-left font-medium">Métrica</th>
                      <th className="py-3 px-4 text-right font-medium">Q1 2023</th>
                      <th className="py-3 px-4 text-right font-medium">Q2 2023</th>
                      <th className="py-3 px-4 text-right font-medium">Q3 2023</th>
                      <th className="py-3 px-4 text-right font-medium">Q4 2023</th>
                      <th className="py-3 px-4 text-right font-medium">Variação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { 
                        name: "Receita Total", 
                        q1: "R$ 284.582", 
                        q2: "R$ 324.938", 
                        q3: "R$ 342.784", 
                        q4: "R$ 398.421", 
                        change: "+40.0%" 
                      },
                      { 
                        name: "Novos Clientes", 
                        q1: "1,284", 
                        q2: "1,542", 
                        q3: "1,768", 
                        q4: "2,104", 
                        change: "+63.9%" 
                      },
                      { 
                        name: "Ticket Médio", 
                        q1: "R$ 248", 
                        q2: "R$ 267", 
                        q3: "R$ 284", 
                        q4: "R$ 312", 
                        change: "+25.8%" 
                      },
                      { 
                        name: "Taxa de Conversão", 
                        q1: "2.8%", 
                        q2: "3.1%", 
                        q3: "3.4%", 
                        q4: "3.9%", 
                        change: "+39.3%" 
                      },
                      { 
                        name: "ROAS", 
                        q1: "3.2", 
                        q2: "3.4", 
                        q3: "3.6", 
                        q4: "4.2", 
                        change: "+31.3%" 
                      },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-border">
                        <td className="py-3 px-4 font-medium">{row.name}</td>
                        <td className="py-3 px-4 text-right">{row.q1}</td>
                        <td className="py-3 px-4 text-right">{row.q2}</td>
                        <td className="py-3 px-4 text-right">{row.q3}</td>
                        <td className="py-3 px-4 text-right">{row.q4}</td>
                        <td className="py-3 px-4 text-right text-emerald-600 dark:text-emerald-400 font-medium">
                          {row.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default StatTemplate;
