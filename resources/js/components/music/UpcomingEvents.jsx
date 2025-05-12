
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Music2 } from 'lucide-react';

const UpcomingEvents = () => {
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music2 className="h-5 w-5" /> Próximos eventos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Aqui você pode adicionar uma lista dos próximos eventos */}
        Em breve...
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
