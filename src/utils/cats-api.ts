import { TCat } from '@utils-types';

const URL = process.env.CATS_API_URL;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

type TCatsResponse = {
  data: TCat[];
};

export const getCatsApi = () =>
  fetch(`${URL}/images/search?limit=10`)
    .then((res) => checkResponse<TCatsResponse>(res))
    .then((data) => data.data);
