
import React from 'react';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Search, 
  SlidersHorizontal 
} from 'lucide-react';

interface DataTableProps {
  title?: string;
  description?: string;
  columns: {
    title: string;
    key: string;
    render?: (value: any, row?: any) => React.ReactNode;
  }[];
  data: any[];
  searchable?: boolean;
  downloadable?: boolean;
  searchPlaceholder?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  description,
  columns,
  data,
  searchable = true,
  downloadable = true,
  searchPlaceholder = "Pesquisar",
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    
    return data.filter(row => {
      return Object.keys(row).some(key => {
        const value = row[key];
        return value && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }, [data, searchQuery]);

  return (
    <div className="bg-card rounded-lg shadow-soft-md overflow-hidden animate-fade-in">
      {(title || searchable || downloadable) && (
        <div className="p-4 border-b border-border flex flex-col sm:flex-row justify-between gap-4">
          <div>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>
          
          <div className="flex items-center gap-3">
            {searchable && (
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  className="pl-9 h-9 w-[180px] md:w-[240px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
            
            <Button variant="outline" size="sm">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            
            {downloadable && (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            )}
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <Table>
          {description && !title && (
            <TableCaption>{description}</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className="font-medium">
                  {column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((row, index) => (
                <TableRow key={index} className="hover:bg-muted/50">
                  {columns.map((column) => (
                    <TableCell key={`${index}-${column.key}`}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-10 text-muted-foreground">
                  {searchQuery ? 'Nenhum resultado encontrado' : 'Sem dados disponíveis'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 border-t border-border flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {data.length > 0 ? `Mostrando ${filteredData.length} de ${data.length} itens` : 'Sem dados'}
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 min-w-9">
            1
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" disabled>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
