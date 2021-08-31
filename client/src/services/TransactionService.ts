import http from './api';
import { AxiosResponse } from 'axios';

const getAll = (date: string): Promise<AxiosResponse> => {
  return http.get(`?period=${date}`);
};
const findOne = (id: string): Promise<AxiosResponse> => {
  return http.get(`/find/${id}`);
};
const create = (data: object): Promise<AxiosResponse> => {
  return http.post('/add', data);
};
const remove = (id: string): Promise<AxiosResponse> => {
  return http.delete(`/remove/${id}`);
};

const update = (id: string, report: object): Promise<AxiosResponse> => {
  return http.put(`/att/${id}`, report);
};

export default { getAll, create, remove, findOne, update };
