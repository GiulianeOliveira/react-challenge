import http from './api';

export const createAccount = async (data) =>
  await http.post('/auth/signup', data);

export const login = async (data) => await http.post('/auth/login', data);
