import { NONE } from '../../utils/constants';
import { SortState } from './types';

export const initialState: SortState = {
  data: [],
  sortConfig: {
    assetClass: NONE,
    price: NONE,
    ticker: NONE,
  },
};
