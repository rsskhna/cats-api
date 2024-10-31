import React from 'react';
import '@testing-library/jest-dom';
import '../__mocks__/intersectionObserverMock';
import { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import App from '../components/app/app';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import { TBreed, TCat } from '@utils-types';
import { configureStore } from '@reduxjs/toolkit';
import { catsReducer } from '../services/slices/catsSlice/catsSlice';
import { breedsReducer } from '../services/slices/breedsSlice/breedsSlice';

const mockCats: TCat[] = [
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

const mockBreeds: TBreed[] = [
  {
    id: '1',
    name: '1'
  },
  {
    id: '2',
    name: '2'
  }
];

const mockStore = configureStore({
  reducer: {
    cats: catsReducer,
    breeds: breedsReducer
  },
  preloadedState: {
    cats: {
      cats: mockCats,
      loading: false,
      error: null
    },
    breeds: {
      breeds: mockBreeds,
      loading: false,
      error: null
    }
  }
});

describe('App component', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={mockStore}>
          <App />
        </Provider>
      );
    });
  });

  it('renders the App component', () => {
    expect(screen.getByRole('heading', { name: /cats/i }));
  });

  it('display cards list', () => {
    expect(screen.getAllByRole('button')).toHaveLength(mockCats.length);
  });

  it('delete card', () => {
    const firstElemButton = screen.getAllByRole('button')[0];
    fireEvent.click(firstElemButton);
    expect(screen.getAllByRole('button')).toHaveLength(mockCats.length - 1);
  });
});
