
// Mock schedules data
const schedules = [
  {
    id: 1,
    title: "Culto de Domingo",
    date: "2023-12-10",
    time: "10:00",
    location: "Igreja Central",
    description: "Culto matinal da família",
    musicians: [
      { musicianId: 1, instrument: "Violão", confirmed: true },
      { musicianId: 2, instrument: "Piano", confirmed: false }
    ],
    songs: [1, 2]
  },
  {
    id: 2,
    title: "Culto de Jovens",
    date: "2023-12-16",
    time: "19:00",
    location: "Salão de Jovens",
    description: "Culto de sábado à noite",
    musicians: [
      { musicianId: 1, instrument: "Guitarra", confirmed: true }
    ],
    songs: [2]
  }
];

// Get all schedules
export const getAllSchedules = () => {
  return Promise.resolve(schedules);
};

// Get schedule by ID
export const getScheduleById = (id) => {
  const schedule = schedules.find(s => s.id === id);
  if (!schedule) {
    return Promise.reject(new Error('Escala não encontrada'));
  }
  return Promise.resolve(schedule);
};

// Create schedule
export const createSchedule = (scheduleData) => {
  const newSchedule = {
    ...scheduleData,
    id: schedules.length + 1
  };
  schedules.push(newSchedule);
  return Promise.resolve(newSchedule);
};

// Update schedule
export const updateSchedule = (id, scheduleData) => {
  const index = schedules.findIndex(s => s.id === id);
  if (index === -1) {
    return Promise.reject(new Error('Escala não encontrada'));
  }
  schedules[index] = { ...schedules[index], ...scheduleData };
  return Promise.resolve(schedules[index]);
};

// Delete schedule
export const deleteSchedule = (id) => {
  const index = schedules.findIndex(s => s.id === id);
  if (index === -1) {
    return Promise.reject(new Error('Escala não encontrada'));
  }
  schedules.splice(index, 1);
  return Promise.resolve({ success: true });
};

// Get schedules by musician ID
export const getSchedulesByMusicianId = (musicianId) => {
  return Promise.resolve(
    schedules.filter(schedule => 
      schedule.musicians.some(musician => musician.musicianId === musicianId)
    )
  );
};
