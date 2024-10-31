import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { filterCatsApi, getCatsApi } from '../../../utils/cats-api';
import { TCat, TThoroughbredCat } from '@utils-types';

export const getCats = createAsyncThunk(
  'cats/getAll',
  async () => await getCatsApi()
);

export const getSpecificCats = createAsyncThunk(
  'specificCats/getAll',
  async (breedId: string) => await filterCatsApi(breedId)
);

type TCatsState = {
  cats: TCat[];
  loading: boolean;
  error: string | null;
};

export const initialState: TCatsState = {
  cats: [],
  loading: false,
  error: null
};

export const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    deleteCard: (state, action: PayloadAction<number>) => {
      state.cats.splice(action.payload, 1);
    },
    setCatsState: (state, action) => {
      state.cats = action.payload;
    }
  },
  selectors: {
    selectCats: (state) => state.cats,
    selectLoading: (state) => state.loading,
    getErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(getCats.fulfilled, (state, action) => {
        state.cats.push(...action.payload);
        state.loading = false;
      })
      .addCase(getSpecificCats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpecificCats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(getSpecificCats.fulfilled, (state, action) => {
        state.cats.push(...action.payload);
        state.loading = false;
      });
  }
});

export const catsReducer = catsSlice.reducer;
export const { deleteCard, setCatsState } = catsSlice.actions;
export const { selectCats, selectLoading } = catsSlice.selectors;
