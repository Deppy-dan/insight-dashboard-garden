
import api from './api';
import { Musician } from '@/types/musician';

// Serviço real que faz chamadas à API Laravel
export const getAllMusicians = async (): Promise<Musician[]> => {
  const response = await api.get('/musicians');
  return response.data;
};

export const getMusicianById = async (id: number): Promise<Musician> => {
  const response = await api.get(`/musicians/${id}`);
  return response.data;
};

export const getMusicianByUserId = async (userId: number): Promise<Musician> => {
  const response = await api.get(`/musicians/user/${userId}`);
  return response.data;
};

export const createMusician = async (musician: Omit<Musician, 'id'>): Promise<Musician> => {
  const response = await api.post('/musicians', musician);
  return response.data;
};

export const updateMusician = async (id: number, updates: Partial<Musician>): Promise<Musician> => {
  const response = await api.put(`/musicians/${id}`, updates);
  return response.data;
};

export const deleteMusician = async (id: number): Promise<void> => {
  await api.delete(`/musicians/${id}`);
};
