import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCatsApi } from '../../../utils/cats-api';
import { TCat } from '@utils-types';

export const getCats = createAsyncThunk(
  'cats/getAll',
  async () => await getCatsApi()
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
  reducers: {},
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
        state.cats = action.payload;
        state.loading = false;
      });
    // .addDefaultCase((state, action) => {
    //   console.log('def');
    // });
  }
});

export const catsReducer = catsSlice.reducer;
export const { selectCats, selectLoading } = catsSlice.selectors;
