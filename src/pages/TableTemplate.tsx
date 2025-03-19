
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import DataTable from '@/components/dashboard/DataTable';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// Mock data for the tables
const productTableData = [
  { id: 1, nome: 'Laptop Pro X', categoria: 'Eletrônicos', preco: 'R$ 5.999,00', estoque: 28, status: 'Em estoque' },
  { id: 2, nome: 'Monitor 32" 4K', categoria: 'Eletrônicos', preco: 'R$ 2.799,00', estoque: 15, status: 'Em estoque' },
  { id: 3, nome: 'Teclado Mecânico RGB', categoria: 'Periféricos', preco: 'R$ 450,00', estoque: 42, status: 'Em estoque' },
  { id: 4, nome: 'Mouse Gamer 12000dpi', categoria: 'Periféricos', preco: 'R$ 299,00', estoque: 30, status: 'Em estoque' },
  { id: 5, nome: 'Headset Wireless', categoria: 'Áudio', preco: 'R$ 799,00', estoque: 8, status: 'Baixo estoque' },
  { id: 6, nome: 'SSD 1TB NVMe', categoria: 'Armazenamento', preco: 'R$ 899,00', estoque: 0, status: 'Sem estoque' },
  { id: 7, nome: 'Webcam HD 1080p', categoria: 'Periféricos', preco: 'R$ 399,00', estoque: 22, status: 'Em estoque' },
  { id: 8, nome: 'Caixa de Som Bluetooth', categoria: 'Áudio', preco: 'R$ 349,00', estoque: 17, status: 'Em estoque' },
];

const productTableColumns = [
  { title: 'ID', key: 'id' },
  { title: 'Produto', key: 'nome' },
  { title: 'Categoria', key: 'categoria' },
  { title: 'Preço', key: 'preco' },
  { title: 'Estoque', key: 'estoque' },
  { 
    title: 'Status', 
    key: 'status',
    render: (value: string) => {
      let className = '';
      if (value === 'Em estoque') className = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      else if (value === 'Baixo estoque') className = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      else if (value === 'Sem estoque') className = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
          {value}
        </span>
      );
    }
  },
];

const userTableData = [
  { id: 1, nome: 'João Silva', email: 'joao.silva@exemplo.com', cargo: 'Gerente', departamento: 'Vendas', ultimoAcesso: '2 horas atrás' },
  { id: 2, nome: 'Maria Oliveira', email: 'maria.oliveira@exemplo.com', cargo: 'Desenvolvedor', departamento: 'TI', ultimoAcesso: '5 minutos atrás' },
  { id: 3, nome: 'Carlos Santos', email: 'carlos.santos@exemplo.com', cargo: 'Analista', departamento: 'Marketing', ultimoAcesso: '1 dia atrás' },
  { id: 4, nome: 'Ana Beatriz', email: 'ana.beatriz@exemplo.com', cargo: 'Designer', departamento: 'Design', ultimoAcesso: '3 horas atrás' },
  { id: 5, nome: 'Pedro Alves', email: 'pedro.alves@exemplo.com', cargo: 'Suporte', departamento: 'TI', ultimoAcesso: '30 minutos atrás' },
  { id: 6, nome: 'Luiza Ferreira', email: 'luiza.ferreira@exemplo.com', cargo: 'Desenvolvedor', departamento: 'TI', ultimoAcesso: '1 hora atrás' },
  { id: 7, nome: 'Fernando Costa', email: 'fernando.costa@exemplo.com', cargo: 'Consultor', departamento: 'Vendas', ultimoAcesso: '2 dias atrás' },
];

const userTableColumns = [
  { title: 'ID', key: 'id' },
  { title: 'Nome', key: 'nome' },
  { title: 'E-mail', key: 'email' },
  { title: 'Cargo', key: 'cargo' },
  { 
    title: 'Departamento', 
    key: 'departamento',
    render: (value: string) => (
      <Badge variant={value === 'TI' ? 'default' : value === 'Vendas' ? 'outline' : 'secondary'}>
        {value}
      </Badge>
    )
  },
  { title: 'Último Acesso', key: 'ultimoAcesso' },
];

const ordersTableData = [
  { id: '#12345', cliente: 'João Silva', data: '10/05/2023', total: 'R$ 5.999,00', pagamento: 'Cartão de Crédito', status: 'Concluído' },
  { id: '#12346', cliente: 'Maria Oliveira', data: '12/05/2023', total: 'R$ 2.799,00', pagamento: 'Boleto', status: 'Pendente' },
  { id: '#12347', cliente: 'Carlos Santos', data: '15/05/2023', total: 'R$ 450,00', pagamento: 'Pix', status: 'Concluído' },
  { id: '#12348', cliente: 'Ana Beatriz', data: '18/05/2023', total: 'R$ 299,00', pagamento: 'Cartão de Débito', status: 'Concluído' },
  { id: '#12349', cliente: 'Pedro Alves', data: '20/05/2023', total: 'R$ 799,00', pagamento: 'Cartão de Crédito', status: 'Cancelado' },
  { id: '#12350', cliente: 'Luiza Ferreira', data: '21/05/2023', total: 'R$ 899,00', pagamento: 'Pix', status: 'Processando' },
  { id: '#12351', cliente: 'Fernando Costa', data: '25/05/2023', total: 'R$ 399,00', pagamento: 'Boleto', status: 'Pendente' },
];

const ordersTableColumns = [
  { title: 'Pedido', key: 'id' },
  { title: 'Cliente', key: 'cliente' },
  { title: 'Data', key: 'data' },
  { title: 'Total', key: 'total' },
  { title: 'Pagamento', key: 'pagamento' },
  { 
    title: 'Status', 
    key: 'status',
    render: (value: string) => {
      let className = '';
      if (value === 'Concluído') className = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      else if (value === 'Pendente') className = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
      else if (value === 'Cancelado') className = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      else if (value === 'Processando') className = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
          {value}
        </span>
      );
    }
  },
];

const TableTemplate: React.FC = () => {
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold tracking-tight">Templates de Tabelas</h1>
        <p className="text-muted-foreground mt-1">Diferentes estilos e formatos para apresentação de dados em tabelas</p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Tabela Padrão</CardTitle>
            <CardDescription>
              Template de tabela com recursos de pesquisa, filtros e exportação
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <DataTable 
              columns={productTableColumns}
              data={productTableData}
              description="Lista de produtos com informações básicas"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tabela com Abas</CardTitle>
            <CardDescription>
              Template de tabela organizada em abas para diferentes conjuntos de dados
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <Tabs defaultValue="produtos">
              <div className="px-4">
                <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 h-auto">
                  <TabsTrigger value="produtos">Produtos</TabsTrigger>
                  <TabsTrigger value="usuarios">Usuários</TabsTrigger>
                  <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="produtos" className="mt-0 p-0">
                <DataTable 
                  columns={productTableColumns}
                  data={productTableData}
                />
              </TabsContent>
              
              <TabsContent value="usuarios" className="mt-0 p-0">
                <DataTable 
                  columns={userTableColumns}
                  data={userTableData}
                />
              </TabsContent>
              
              <TabsContent value="pedidos" className="mt-0 p-0">
                <DataTable 
                  columns={ordersTableColumns}
                  data={ordersTableData}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tabela Compacta</CardTitle>
              <CardDescription>
                Versão simplificada para espaços menores
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="whitespace-nowrap py-3 px-4 text-left font-medium">Produto</th>
                      <th className="whitespace-nowrap py-3 px-4 text-left font-medium">Categoria</th>
                      <th className="whitespace-nowrap py-3 px-4 text-left font-medium">Preço</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productTableData.slice(0, 5).map((product, index) => (
                      <tr key={index} className="border-t border-border">
                        <td className="py-2 px-4">{product.nome}</td>
                        <td className="py-2 px-4">{product.categoria}</td>
                        <td className="py-2 px-4">{product.preco}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Usuários</CardTitle>
              <CardDescription>
                Formato alternativo para exibir dados
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ul className="divide-y divide-border">
                {userTableData.slice(0, 5).map((user, index) => (
                  <li key={index} className="flex justify-between items-center py-3 px-4">
                    <div>
                      <p className="font-medium">{user.nome}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <Badge variant="outline">{user.departamento}</Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
};

export default TableTemplate;
