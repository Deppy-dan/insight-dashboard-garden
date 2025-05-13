
import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Download, Search, SlidersHorizontal } from 'lucide-react';

// Sample musician data
const musicians = [
  { id: 1, name: 'João Silva', instrument: 'Violão', availability: 'Manhã', days: 'Dom, Qua', tones: 'G, D, E', experience: 'Avançado' },
  { id: 2, name: 'Maria Oliveira', instrument: 'Vocal', availability: 'Tarde', days: 'Dom, Sex', tones: 'C, D, F', experience: 'Intermediário' },
  { id: 3, name: 'Carlos Santos', instrument: 'Bateria', availability: 'Manhã', days: 'Dom, Ter, Sáb', tones: 'Todos', experience: 'Avançado' },
  { id: 4, name: 'Ana Beatriz', instrument: 'Teclado', availability: 'Tarde', days: 'Dom, Qui', tones: 'C, G, A', experience: 'Intermediário' },
  { id: 5, name: 'Pedro Alves', instrument: 'Baixo', availability: 'Noite', days: 'Dom, Qua, Sex', tones: 'E, A, D', experience: 'Iniciante' },
  { id: 6, name: 'Luiza Ferreira', instrument: 'Violino', availability: 'Manhã', days: 'Dom, Sáb', tones: 'D, A, E', experience: 'Avançado' },
  { id: 7, name: 'Fernando Costa', instrument: 'Vocal', availability: 'Manhã', days: 'Dom, Ter, Qui, Sáb', tones: 'G, A, B', experience: 'Avançado' },
];

// Helper to render availability badge
const AvailabilityBadge = ({ type }) => {
  const styles = {
    'Manhã': 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    'Tarde': 'bg-amber-100 text-amber-700 hover:bg-amber-200',
    'Noite': 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  };
  
  return (
    <Badge variant="outline" className={styles[type] || ''}>
      {type}
    </Badge>
  );
};

// Helper to render experience badge
const ExperienceBadge = ({ level }) => {
  const styles = {
    'Avançado': 'bg-green-100 text-green-700',
    'Intermediário': 'bg-amber-100 text-amber-700',
    'Iniciante': 'bg-blue-100 text-blue-700',
  };
  
  return (
    <Badge variant="outline" className={styles[level] || ''}>
      {level}
    </Badge>
  );
};

const MusiciansListView = () => {
  return (
    <Layout>
      <Helmet>
        <title>Lista de Músicos | MúsicaIgreja</title>
      </Helmet>
      
      <div className="container py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Lista de Músicos</h1>
          <p className="text-muted-foreground">Gerenciamento de músicos, instrumentos e disponibilidade</p>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Pesquisar" 
                className="pl-10" 
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <SlidersHorizontal size={18} />
              </Button>
              <Button variant="outline">
                <Download size={18} className="mr-2" /> 
                Exportar
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Instrumento</TableHead>
                  <TableHead>Disponibilidade</TableHead>
                  <TableHead>Dias</TableHead>
                  <TableHead>Tom Preferido</TableHead>
                  <TableHead>Experiência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {musicians.map((musician) => (
                  <TableRow key={musician.id}>
                    <TableCell>{musician.id}</TableCell>
                    <TableCell>{musician.name}</TableCell>
                    <TableCell>{musician.instrument}</TableCell>
                    <TableCell>
                      <AvailabilityBadge type={musician.availability} />
                    </TableCell>
                    <TableCell>{musician.days}</TableCell>
                    <TableCell>{musician.tones}</TableCell>
                    <TableCell>
                      <ExperienceBadge level={musician.experience} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Mostrando 7 de 7 itens</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                &lt;
              </Button>
              <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                &gt;
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Total de Músicos</h3>
              </div>
              <p className="text-3xl font-bold mt-2">7</p>
              <p className="text-sm text-muted-foreground mt-1">2 vocais, 5 instrumentistas</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Eventos Previstos</h3>
              </div>
              <p className="text-3xl font-bold mt-2">5</p>
              <p className="text-sm text-muted-foreground mt-1">Próximo: 10/05 - Ensaio Geral</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Disponibilidade</h3>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="text-center">
                  <div className="text-xl font-bold">4</div>
                  <div className="text-xs text-muted-foreground">Manhã</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">5</div>
                  <div className="text-xs text-muted-foreground">Tarde</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">4</div>
                  <div className="text-xs text-muted-foreground">Noite</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MusiciansListView;
