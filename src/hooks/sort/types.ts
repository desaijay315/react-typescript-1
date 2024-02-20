import { sortDirection } from '../../common/types';
import { TableItem } from '../../components/Table/types';
import { ASSET_CLASS,PRICE, TICKER } from '../../utils/constants';
import { TOGGLE_SORT, SET_DATA } from '../../utils/constants';

export enum SortActionType {
    SORT = 'SORT',
  }


  //useReducer structure
export interface SortState {
  data: TableItem[];
  sortConfig: {
    assetClass: sortDirection,
    price: sortDirection,
    ticker: sortDirection,
  };
}


// Action types of reducer
export type SortAction =
  | { type: typeof TOGGLE_SORT ; columnName: 'assetClass' | 'price' | 'ticker' }
 | {type: typeof SET_DATA, payload: TableItem[]};

export interface SortState {
    data: TableItem[];
    sortConfig: {
      assetClass: sortDirection,
      price: sortDirection,
      ticker: sortDirection,
    };
  }