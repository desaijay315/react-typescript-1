import { SortState } from './types';

export const initialState: SortState = {
  data: [],
  sortConfig: {
    assetClass: 'none',
    price: 'none',
    ticker: 'none',
  },
};
