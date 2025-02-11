import { TBreed, TBreedResponse, TCat, TThoroughbredCat } from '@utils-types';

export const URL = process.env.CATS_API_URL;
const API_KEY =
  'live_GCrk46BXgaWv6Hm2tSLn2hmQNyWRJQFlR6rduv3zv6rNAynjlSvU9imJ6tlNVDXo';

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getCatsApi = () =>
  fetch(`${URL}/images/search?limit=10`)
    .then((res) => checkResponse<TCat[]>(res))
    .then((data) => data);

export const getBreedsApi = () =>
  fetch(`${URL}/breeds`)
    .then((res) => checkResponse<TBreedResponse[]>(res))
    .then((data) => {
      const newData: TBreed[] = [];
      data.forEach((breed) => {
        newData.push({
          name: breed.name,
          id: breed.id
        });
      });
      return newData;
    });

export const filterCatsApi = (breedId: string) =>
  fetch(`${URL}/images/search?limit=10&breed_ids=${breedId}`, {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY
    }
  })
    .then((res) => checkResponse<TThoroughbredCat[]>(res))
    .then((data) => {
      const newData: TCat[] = [];
      data.forEach((catInfo) => {
        newData.push({
          id: catInfo.id,
          url: catInfo.url,
          width: catInfo.width,
          height: catInfo.height
        });
      });
      return newData;
    });
