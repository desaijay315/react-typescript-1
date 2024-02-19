import { TableItem } from '../../components/Table/types/table';
import { ASSET_CLASS,PRICE, TICKER } from '../../constants';

export enum SortActionType {
    SORT = 'SORT',
  }
  

// Define the state structure for useReducer
export interface SortState {
  data: TableItem[];
  sortConfig: {
    assetClass: 'asc' | 'desc' | 'none',
    price: 'asc' | 'desc' | 'none',
    ticker: 'asc' | 'desc' | 'none',
  };
}


// Action types for the reducer
export type SortAction =
  | { type: 'TOGGLE_SORT'; columnName: 'assetClass' | 'price' | 'ticker' }
 | {type: 'SET_DATA', payload: TableItem[]};

export interface SortState {
    data: TableItem[];
    sortConfig: {
      assetClass: 'asc' | 'desc' | 'none',
      price: 'asc' | 'desc' | 'none',
      ticker: 'asc' | 'desc' | 'none',
    };
  }
  
  

  export type ColumnName = typeof ASSET_CLASS | typeof PRICE | typeof TICKER;
