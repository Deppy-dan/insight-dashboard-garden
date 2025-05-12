
// Mock songs data
const songs = [
  {
    id: 1,
    title: "Grande é o Senhor",
    artist: "Adhemar de Campos",
    key: "G",
    tempo: 90,
    category: "Louvor",
    style: "Contemporâneo",
    timesPlayed: 12,
    lastPlayed: "2023-11-12"
  },
  {
    id: 2,
    title: "Consagração",
    artist: "Aline Barros",
    key: "D",
    tempo: 75,
    category: "Adoração",
    style: "Contemporâneo",
    timesPlayed: 8,
    lastPlayed: "2023-11-05"
  }
];

// Get all songs
export const getAllSongs = () => {
  return Promise.resolve(songs);
};

// Get song by ID
export const getSongById = (id) => {
  const song = songs.find(s => s.id === id);
  if (!song) {
    return Promise.reject(new Error('Música não encontrada'));
  }
  return Promise.resolve(song);
};

// Create song
export const createSong = (songData) => {
  const newSong = {
    ...songData,
    id: songs.length + 1,
    timesPlayed: songData.timesPlayed || 0
  };
  songs.push(newSong);
  return Promise.resolve(newSong);
};

// Update song
export const updateSong = (id, songData) => {
  const index = songs.findIndex(s => s.id === id);
  if (index === -1) {
    return Promise.reject(new Error('Música não encontrada'));
  }
  songs[index] = { ...songs[index], ...songData };
  return Promise.resolve(songs[index]);
};

// Delete song
export const deleteSong = (id) => {
  const index = songs.findIndex(s => s.id === id);
  if (index === -1) {
    return Promise.reject(new Error('Música não encontrada'));
  }
  songs.splice(index, 1);
  return Promise.resolve({ success: true });
};
