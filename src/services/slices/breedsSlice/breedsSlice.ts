import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBreedsApi } from '../../../utils/cats-api';
import { TBreed } from '@utils-types';

export const getBreeds = createAsyncThunk(
  'breeds/getAll',
  async () => await getBreedsApi()
);

type TBreedsState = {
  breeds: TBreed[];
  loading: boolean;
  error: string | null;
};

export const initialState: TBreedsState = {
  breeds: [],
  loading: false,
  error: null
};

export const breedsSlice = createSlice({
  name: 'breeds',
  initialState,
  reducers: {},
  selectors: {
    selectBreeds: (state) => state.breeds
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBreeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBreeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ? action.error.message : null;
      })
      .addCase(getBreeds.fulfilled, (state, action) => {
        state.breeds = [
          {
            id: 'all',
            name: 'All breeds'
          },
          ...action.payload
        ];
        state.loading = false;
      });
  }
});

export const breedsReducer = breedsSlice.reducer;
export const {} = breedsSlice.actions;
export const { selectBreeds } = breedsSlice.selectors;
