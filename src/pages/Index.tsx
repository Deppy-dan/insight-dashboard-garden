
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Users, DollarSign, ShoppingCart, BarChart3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import LineChart from '@/components/dashboard/LineChart';
import BarChart from '@/components/dashboard/BarChart';
import PieChart from '@/components/dashboard/PieChart';
import DataTable from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Mock data for charts
const lineChartData = [
  { month: 'Jan', vendas: 1200, visitas: 4000 },
  { month: 'Fev', vendas: 1900, visitas: 4200 },
  { month: 'Mar', vendas: 2000, visitas: 5800 },
  { month: 'Abr', vendas: 2780, visitas: 7000 },
  { month: 'Mai', vendas: 1890, visitas: 6500 },
  { month: 'Jun', vendas: 2390, visitas: 8000 },
  { month: 'Jul', vendas: 3490, visitas: 9000 },
];

const barChartData = [
  { categoria: 'Categoria A', valor: 4000 },
  { categoria: 'Categoria B', valor: 3000 },
  { categoria: 'Categoria C', valor: 2000 },
  { categoria: 'Categoria D', valor: 2780 },
  { categoria: 'Categoria E', valor: 1890 },
];

const pieChartData = [
  { name: 'Grupo A', value: 400, color: '#8B5CF6' },
  { name: 'Grupo B', value: 300, color: '#3B82F6' },
  { name: 'Grupo C', value: 300, color: '#10B981' },
  { name: 'Grupo D', value: 200, color: '#F59E0B' },
];

// Mock data for table
const tableData = [
  { id: 1, cliente: 'João Silva', produto: 'Laptop Pro X', valor: 'R$ 5.999,00', status: 'Concluído', data: '10/05/2023' },
  { id: 2, cliente: 'Maria Oliveira', produto: 'Monitor 32" 4K', valor: 'R$ 2.799,00', status: 'Pendente', data: '12/05/2023' },
  { id: 3, cliente: 'Carlos Santos', produto: 'Teclado Mecânico', valor: 'R$ 450,00', status: 'Concluído', data: '15/05/2023' },
  { id: 4, cliente: 'Ana Beatriz', produto: 'Mouse Gamer', valor: 'R$ 299,00', status: 'Concluído', data: '18/05/2023' },
  { id: 5, cliente: 'Pedro Alves', produto: 'Headset Wireless', valor: 'R$ 799,00', status: 'Cancelado', data: '20/05/2023' },
];

const tableColumns = [
  { title: 'ID', key: 'id' },
  { title: 'Cliente', key: 'cliente' },
  { title: 'Produto', key: 'produto' },
  { title: 'Valor', key: 'valor' },
  { 
    title: 'Status', 
    key: 'status',
    render: (value: string) => {
      let className = '';
      if (value === 'Concluído') className = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      else if (value === 'Pendente') className = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      else if (value === 'Cancelado') className = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
          {value}
        </span>
      );
    }
  },
  { title: 'Data', key: 'data' },
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  
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
        <h1 className="text-2xl font-display font-semibold tracking-tight">Painel Administrativo</h1>
        <p className="text-muted-foreground mt-1">Visão geral dos templates de visualização de dados</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"
      >
        <motion.div variants={item}>
          <StatCard
            title="Usuários"
            value="1,274"
            variant="blue"
            trend={{ value: 12, isPositive: true }}
            icon={<Users size={20} />}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard
            title="Receita Total"
            value="R$ 24,895"
            variant="green"
            trend={{ value: 8, isPositive: true }}
            icon={<DollarSign size={20} />}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard
            title="Vendas"
            value="432"
            variant="purple"
            trend={{ value: 4, isPositive: true }}
            icon={<ShoppingCart size={20} />}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <StatCard
            title="Taxa de Conversão"
            value="3.2%"
            variant="amber"
            trend={{ value: 0.5, isPositive: false }}
            icon={<BarChart3 size={20} />}
          />
        </motion.div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div variants={item}>
          <LineChart
            data={lineChartData}
            title="Desempenho de Vendas vs. Visitas"
            description="Comparação mensal de vendas e visitas do site"
            xAxisDataKey="month"
            lines={[
              { dataKey: "vendas", stroke: "#8B5CF6", name: "Vendas" },
              { dataKey: "visitas", stroke: "#3B82F6", name: "Visitas" }
            ]}
          />
        </motion.div>
        
        <motion.div variants={item}>
          <BarChart
            data={barChartData}
            title="Distribuição por Categoria"
            description="Valores totais por categoria de produto"
            xAxisDataKey="categoria"
            bars={[
              { dataKey: "valor", fill: "#3B82F6", name: "Valor" }
            ]}
          />
        </motion.div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 gap-6 mb-6">
        <motion.div variants={item}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                <div className="p-6">
                  <h3 className="text-base font-medium mb-4">Templates Disponíveis</h3>
                  <ul className="space-y-3">
                    <li>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between"
                        onClick={() => navigate('/table-template')}
                      >
                        Tabelas
                        <ChevronRight size={16} />
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between"
                        onClick={() => navigate('/chart-template')}
                      >
                        Gráficos
                        <ChevronRight size={16} />
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between"
                        onClick={() => navigate('/card-template')}
                      >
                        Cartões
                        <ChevronRight size={16} />
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant="outline" 
                        className="w-full justify-between"
                        onClick={() => navigate('/stat-template')}
                      >
                        Estatísticas
                        <ChevronRight size={16} />
                      </Button>
                    </li>
                  </ul>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-medium mb-4">Distribuição por Segmento</h3>
                  <div className="h-[200px]">
                    <PieChart
                      data={pieChartData}
                      height={200}
                      innerRadius={40}
                      outerRadius={70}
                    />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-base font-medium mb-4">Atividades Recentes</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {item === 1 ? (
                            <Users size={16} />
                          ) : item === 2 ? (
                            <ShoppingCart size={16} />
                          ) : (
                            <DollarSign size={16} />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {item === 1 ? "Novo usuário registrado" : 
                             item === 2 ? "Nova ordem criada" : 
                             "Pagamento confirmado"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item === 1 ? "2 minutos atrás" : 
                             item === 2 ? "1 hora atrás" : 
                             "3 horas atrás"}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="mt-2 w-full text-primary">
                      Ver todas atividades
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 gap-6">
        <motion.div variants={item}>
          <DataTable 
            title="Últimas Transações"
            description="Lista das transações mais recentes no sistema"
            columns={tableColumns}
            data={tableData}
          />
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Index;
