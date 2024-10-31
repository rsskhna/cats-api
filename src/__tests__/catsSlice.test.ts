import { TCat } from '@utils-types';
import {
  catsReducer,
  deleteCard,
  getCats,
  getSpecificCats,
  initialState,
  setCatsState
} from '../services/slices/catsSlice/catsSlice';

const catsData: TCat[] = [
  {
    id: '1',
    url: '1',
    width: 1,
    height: 1
  },
  {
    id: '2',
    url: '2',
    width: 2,
    height: 2
  }
];

const breedId: string = 'beng';

describe('catsReducer actions test', () => {
  it('deleteCard test', () => {
    const filledState = {
      ...initialState,
      cats: catsData
    };

    const newState = catsReducer(filledState, deleteCard(1));
    expect(newState).toEqual({
      ...initialState,
      cats: [
        {
          id: '1',
          url: '1',
          width: 1,
          height: 1
        }
      ]
    });
  });

  it('setCatsState actions test', () => {
    const filledState = {
      ...initialState,
      cats: catsData
    };

    const newState = catsReducer(filledState, setCatsState([]));
    expect(newState).toEqual({
      ...initialState,
      cats: []
    });
  });
});

describe('catsReducer async actions test', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('getCats fulfilled', () => {
    const actualState = catsReducer(
      { ...initialState, cats: catsData, loading: true },
      getCats.fulfilled(catsData, '')
    );

    expect(actualState).toEqual({
      cats: [...catsData, ...catsData],
      loading: false,
      error: null
    });
  });

  it('getCats pending', () => {
    const testError = new Error('error');

    const actualState = catsReducer(
      { ...initialState, error: testError.message },
      getCats.pending('')
    );
    expect(actualState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('getCats rejected', () => {
    const testError = new Error('error');

    const actualState = catsReducer(
      {
        ...initialState,
        loading: true
      },
      getCats.rejected(testError, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      error: testError.message
    });
  });
});

describe('catsReducer(specificCats) async actions test', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('getSpecificCats fulfilled', () => {
    const actualState = catsReducer(
      { ...initialState, cats: catsData, loading: true },
      getSpecificCats.fulfilled(catsData, '', breedId)
    );

    expect(actualState).toEqual({
      cats: [...catsData, ...catsData],
      loading: false,
      error: null
    });
  });

  it('getSpecificCats pending', () => {
    const testError = new Error('error');

    const actualState = catsReducer(
      { ...initialState, error: testError.message },
      getSpecificCats.pending('', breedId)
    );
    expect(actualState).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('getSpecificCats rejected', () => {
    const testError = new Error('error');

    const actualState = catsReducer(
      {
        ...initialState,
        loading: true
      },
      getSpecificCats.rejected(testError, '', breedId)
    );

    expect(actualState).toEqual({
      ...initialState,
      error: testError.message
    });
  });
});
