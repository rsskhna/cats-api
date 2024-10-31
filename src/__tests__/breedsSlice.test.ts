import { expect, jest } from '@jest/globals';
import { TBreed } from '@utils-types';
import {
  breedsReducer,
  getBreeds
} from '../services/slices/breedsSlice/breedsSlice';
import { initialState } from '../services/slices/breedsSlice/breedsSlice';

describe('breedsReducer actions tests', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const breedsData: TBreed[] = [
    {
      id: '1',
      name: '1'
    },
    {
      id: '2',
      name: '2'
    }
  ];

  it('getBreeds fulfilled', () => {
    const actualState = breedsReducer(
      { ...initialState, breeds: breedsData, loading: true },
      getBreeds.fulfilled(breedsData, '')
    );

    expect(actualState).toEqual({
      breeds: breedsData,
      loading: false,
      error: null
    });
  });

  it('getBreeds pending', () => {
    const testError = new Error('error');

    const actualState = breedsReducer(
      { ...initialState, error: testError.message },
      getBreeds.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('getBreeds rejected', () => {
    const testError = new Error('error');

    const actualState = breedsReducer(
      {
        ...initialState,
        loading: true
      },
      getBreeds.rejected(testError, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      error: testError.message
    });
  });
});
