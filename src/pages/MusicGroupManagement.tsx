
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Layout from '@/components/layout/Layout';

// Import refactored components
import { AddSongDialog } from '@/components/music/AddSongDialog';
import { CreateScheduleDialog } from '@/components/music/CreateScheduleDialog';
import { SongsList } from '@/components/music/SongsList';
import { UpcomingEvents } from '@/components/music/UpcomingEvents';

// Import services
import { getAllSongs } from '@/services/songService';
import { getAllMusicians } from '@/services/musicianService';

const MusicGroupManagement = () => {
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  
  // Fetch data
  const { data: songs, isLoading: isSongsLoading } = useQuery({
    queryKey: ['songs'],
    queryFn: getAllSongs,
  });

  const { data: musicians, isLoading: isMusiciansLoading } = useQuery({
    queryKey: ['musicians'],
    queryFn: getAllMusicians,
  });

  if (isSongsLoading || isMusiciansLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Gerenciamento de Música</h1>
            <p className="text-muted-foreground">
              Adicione músicas e crie eventos para sua igreja
            </p>
          </div>
          <div className="flex gap-2">
            <AddSongDialog 
              open={songDialogOpen} 
              onOpenChange={setSongDialogOpen} 
            />
            <CreateScheduleDialog 
              open={scheduleDialogOpen}
              onOpenChange={setScheduleDialogOpen}
              musicians={musicians || []}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UpcomingEvents />
          <SongsList songs={songs || []} isLoading={isSongsLoading} />
        </div>
      </div>
    </Layout>
  );
};

export default MusicGroupManagement;
