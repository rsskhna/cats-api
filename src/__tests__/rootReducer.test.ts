import { expect, describe } from '@jest/globals';
import { store, rootReducer } from '../services/store';

describe('RootReducer', () => {
  it('проверка rootReduce', () => {
    const newState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(newState);
  });
});
