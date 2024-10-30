import { TCat } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

export const URL = process.env.CATS_API_URL;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getCatsApi = () =>
  fetch(`${URL}/images/search?limit=10`)
    .then((res) => checkResponse<TCat[]>(res))
    .then((data) => data);
