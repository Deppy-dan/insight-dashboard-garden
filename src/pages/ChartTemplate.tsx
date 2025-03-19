
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import LineChart from '@/components/dashboard/LineChart';
import BarChart from '@/components/dashboard/BarChart';
import PieChart from '@/components/dashboard/PieChart';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for charts
const lineChartData = [
  { month: 'Jan', vendas: 1200, visitas: 4000, conversoes: 400 },
  { month: 'Fev', vendas: 1900, visitas: 4200, conversoes: 430 },
  { month: 'Mar', vendas: 2000, visitas: 5800, conversoes: 550 },
  { month: 'Abr', vendas: 2780, visitas: 7000, conversoes: 650 },
  { month: 'Mai', vendas: 1890, visitas: 6500, conversoes: 580 },
  { month: 'Jun', vendas: 2390, visitas: 8000, conversoes: 720 },
  { month: 'Jul', vendas: 3490, visitas: 9000, conversoes: 850 },
  { month: 'Ago', vendas: 3200, visitas: 8500, conversoes: 780 },
  { month: 'Set', vendas: 2800, visitas: 7800, conversoes: 690 },
  { month: 'Out', vendas: 2950, visitas: 8200, conversoes: 710 },
  { month: 'Nov', vendas: 3300, visitas: 8800, conversoes: 790 },
  { month: 'Dez', vendas: 3700, visitas: 9500, conversoes: 880 },
];

const barChartData = [
  { categoria: 'Categoria A', valor: 4000, diferenca: 2400 },
  { categoria: 'Categoria B', valor: 3000, diferenca: 1398 },
  { categoria: 'Categoria C', valor: 2000, diferenca: 9800 },
  { categoria: 'Categoria D', valor: 2780, diferenca: 3908 },
  { categoria: 'Categoria E', valor: 1890, diferenca: 4800 },
  { categoria: 'Categoria F', valor: 2390, diferenca: 3800 },
];

const multiBarChartData = [
  { mes: 'Jan', plano_a: 4000, plano_b: 2400, plano_c: 1800 },
  { mes: 'Fev', plano_a: 3000, plano_b: 1398, plano_c: 2200 },
  { mes: 'Mar', plano_a: 2000, plano_b: 9800, plano_c: 2800 },
  { mes: 'Abr', plano_a: 2780, plano_b: 3908, plano_c: 1800 },
  { mes: 'Mai', plano_a: 1890, plano_b: 4800, plano_c: 2500 },
  { mes: 'Jun', plano_a: 2390, plano_b: 3800, plano_c: 2300 },
];

const pieChartData = [
  { name: 'Grupo A', value: 400, color: '#8B5CF6' },
  { name: 'Grupo B', value: 300, color: '#3B82F6' },
  { name: 'Grupo C', value: 300, color: '#10B981' },
  { name: 'Grupo D', value: 200, color: '#F59E0B' },
  { name: 'Grupo E', value: 100, color: '#EF4444' },
];

const donutChartData = [
  { name: 'Desktop', value: 580, color: '#8B5CF6' },
  { name: 'Mobile', value: 380, color: '#3B82F6' },
  { name: 'Tablet', value: 120, color: '#10B981' },
];

const ChartTemplate: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold tracking-tight">Templates de Gráficos</h1>
        <p className="text-muted-foreground mt-1">Diferentes estilos de gráficos para visualização de dados</p>
      </div>
      
      <motion.div
        initial={{ opacity:.0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Gráficos de Linhas</CardTitle>
            <CardDescription>
              Visualize tendências ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="simples">
              <TabsList className="mb-4">
                <TabsTrigger value="simples">Simples</TabsTrigger>
                <TabsTrigger value="multiplo">Múltiplas Séries</TabsTrigger>
              </TabsList>
              
              <TabsContent value="simples">
                <LineChart
                  data={lineChartData}
                  xAxisDataKey="month"
                  lines={[
                    { dataKey: "vendas", stroke: "#8B5CF6", name: "Vendas" }
                  ]}
                  height={350}
                />
              </TabsContent>
              
              <TabsContent value="multiplo">
                <LineChart
                  data={lineChartData}
                  xAxisDataKey="month"
                  lines={[
                    { dataKey: "vendas", stroke: "#8B5CF6", name: "Vendas" },
                    { dataKey: "visitas", stroke: "#3B82F6", name: "Visitas" },
                    { dataKey: "conversoes", stroke: "#10B981", name: "Conversões" }
                  ]}
                  height={350}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Gráficos de Barras</CardTitle>
            <CardDescription>
              Compare valores entre diferentes categorias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="vertical">
              <TabsList className="mb-4">
                <TabsTrigger value="vertical">Vertical</TabsTrigger>
                <TabsTrigger value="horizontal">Horizontal</TabsTrigger>
                <TabsTrigger value="multiplas">Múltiplas Séries</TabsTrigger>
                <TabsTrigger value="empilhadas">Empilhadas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="vertical">
                <BarChart
                  data={barChartData}
                  xAxisDataKey="categoria"
                  bars={[
                    { dataKey: "valor", fill: "#3B82F6", name: "Valor" }
                  ]}
                  height={350}
                />
              </TabsContent>
              
              <TabsContent value="horizontal">
                <BarChart
                  data={barChartData.slice(0, 5)}
                  xAxisDataKey="categoria"
                  bars={[
                    { dataKey: "valor", fill: "#8B5CF6", name: "Valor" }
                  ]}
                  layout="vertical"
                  height={350}
                />
              </TabsContent>
              
              <TabsContent value="multiplas">
                <BarChart
                  data={multiBarChartData}
                  xAxisDataKey="mes"
                  bars={[
                    { dataKey: "plano_a", fill: "#8B5CF6", name: "Plano A" },
                    { dataKey: "plano_b", fill: "#3B82F6", name: "Plano B" },
                    { dataKey: "plano_c", fill: "#10B981", name: "Plano C" }
                  ]}
                  height={350}
                />
              </TabsContent>
              
              <TabsContent value="empilhadas">
                <BarChart
                  data={multiBarChartData}
                  xAxisDataKey="mes"
                  bars={[
                    { dataKey: "plano_a", fill: "#8B5CF6", name: "Plano A" },
                    { dataKey: "plano_b", fill: "#3B82F6", name: "Plano B" },
                    { dataKey: "plano_c", fill: "#10B981", name: "Plano C" }
                  ]}
                  stacked
                  height={350}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gráfico de Pizza</CardTitle>
              <CardDescription>
                Visualize a proporção entre diferentes categorias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart
                data={pieChartData}
                height={300}
                innerRadius={0}
                outerRadius={100}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Gráfico de Rosca (Donut)</CardTitle>
              <CardDescription>
                Similar ao gráfico de pizza, mas com espaço no centro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart
                data={donutChartData}
                height={300}
                innerRadius={80}
                outerRadius={100}
              />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Gráfico Combinado</CardTitle>
            <CardDescription>
              Combine diferentes tipos de gráficos para análises avançadas
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LineChart
              data={lineChartData.slice(0, 6)}
              xAxisDataKey="month"
              lines={[
                { dataKey: "vendas", stroke: "#8B5CF6", name: "Vendas" },
                { dataKey: "conversoes", stroke: "#10B981", name: "Conversões" }
              ]}
              height={300}
            />
            <BarChart
              data={lineChartData.slice(0, 6)}
              xAxisDataKey="month"
              bars={[
                { dataKey: "visitas", fill: "#3B82F6", name: "Visitas" }
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
};

export default ChartTemplate;
