
// Mock musicians data
const musicians = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@exemplo.com",
    phone: "(11) 99999-8888",
    instruments: ["Violão", "Guitarra"],
    skillLevel: "Avançado",
    joined: "2022-01-15",
    availability: [
      { day: "Segunda", period: "Noite" },
      { day: "Quarta", period: "Noite" }
    ]
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria@exemplo.com",
    phone: "(11) 97777-6666",
    instruments: ["Piano", "Teclado"],
    skillLevel: "Intermediário",
    joined: "2022-03-10",
    availability: [
      { day: "Terça", period: "Tarde" },
      { day: "Quinta", period: "Noite" }
    ]
  }
];

// Get all musicians
export const getAllMusicians = () => {
  return Promise.resolve(musicians);
};

// Get musician by ID
export const getMusicianById = (id) => {
  const musician = musicians.find(m => m.id === id);
  if (!musician) {
    return Promise.reject(new Error('Músico não encontrado'));
  }
  return Promise.resolve(musician);
};

// Create musician
export const createMusician = (musicianData) => {
  const newMusician = {
    ...musicianData,
    id: musicians.length + 1,
  };
  musicians.push(newMusician);
  return Promise.resolve(newMusician);
};

// Update musician
export const updateMusician = (id, musicianData) => {
  const index = musicians.findIndex(m => m.id === id);
  if (index === -1) {
    return Promise.reject(new Error('Músico não encontrado'));
  }
  musicians[index] = { ...musicians[index], ...musicianData };
  return Promise.resolve(musicians[index]);
};

// Delete musician
export const deleteMusician = (id) => {
  const index = musicians.findIndex(m => m.id === id);
  if (index === -1) {
    return Promise.reject(new Error('Músico não encontrado'));
  }
  musicians.splice(index, 1);
  return Promise.resolve({ success: true });
};

// Get schedules by musician ID
export const getSchedulesByMusicianId = (musicianId) => {
  // This is a mock implementation - in a real app this would fetch from an API
  const schedules = [
    {
      id: 1,
      title: "Culto de Domingo",
      date: "2023-12-10",
      time: "10:00",
      location: "Igreja Central",
      musicians: [
        { musicianId: 1, instrument: "Violão", confirmed: true },
        { musicianId: 2, instrument: "Piano", confirmed: false }
      ]
    }
  ];
  
  return Promise.resolve(schedules.filter(s => 
    s.musicians.some(m => m.musicianId === musicianId)
  ));
};
