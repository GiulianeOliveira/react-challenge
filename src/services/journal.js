import http from './api';

export const postJournal = async (data) => await http.post('/journals/', data);

export const getJournals = async (id) => await http.get(`/journals/${id}`);

export const createNote = async (id, data) =>
  await http.post(`/journals/entry/${id}`, data);

export const getNotes = async (id) => await http.get(`/journals/entries/${id}`);
