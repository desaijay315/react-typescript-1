import { useReducer, useEffect } from 'react';
import { TableItem } from '../../../models/table';
import { initialData } from '../Table';


const initialState: SortState = {
  data: [], // Initial data is empty, will be set via `setData`
  sortConfig: {
    assetClass: 'none', // Start with no sorting
    price: 'none',
    ticker: 'none',
  },
};

// Action types for the reducer
type SortAction =
  | { type: 'TOGGLE_SORT'; columnName: 'assetClass' | 'price' | 'ticker' }
 | {type: 'SET_DATA', payload: TableItem[]};

  interface SortState {
    data: TableItem[];
    sortConfig: {
      assetClass: 'asc' | 'desc' | 'none',
      price: 'asc' | 'desc' | 'none',
      ticker: 'asc' | 'desc' | 'none',
    };
  }
  
  
  const sortDirectionToggle = (currentDirection: 'asc' | 'desc' | 'none'): 'asc' | 'desc' => {
    if (currentDirection === 'none' || currentDirection === 'desc') {
      return 'asc';
    } else {
      return 'desc';
    }
  };

  const tableSortReducer = (state: SortState, action: SortAction): SortState => {
    switch (action.type) {
      case 'TOGGLE_SORT':
        const newSortConfig = { ...state.sortConfig };
        let sortedData = [...state.data];
  
        if (action.columnName === 'assetClass') {
          const assetClassOrder = ['Equities', 'Macro', 'Credit'];
          newSortConfig.assetClass = sortDirectionToggle(state.sortConfig.assetClass);
          sortedData.sort((a, b) => {
            const orderA = assetClassOrder.indexOf(a.assetClass);
            const orderB = assetClassOrder.indexOf(b.assetClass);
            return newSortConfig.assetClass === 'asc' ? orderA - orderB : orderB - orderA;
          });
        }
  
        // Repeat similar adjustments for 'price' and 'ticker'
        if (action.columnName === 'price') {
          newSortConfig.price = state.sortConfig.price === 'none' ? 'desc' : sortDirectionToggle(state.sortConfig.price);
          sortedData.sort((a, b) => newSortConfig.price === 'asc' ? a.price - b.price : b.price - a.price);
        }
  
        if (action.columnName === 'ticker') {
          newSortConfig.ticker = state.sortConfig.ticker === 'none' ? 'desc' : sortDirectionToggle(state.sortConfig.ticker);
          sortedData.sort((a, b) => newSortConfig.ticker === 'asc' ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker));
        }
  
        return { ...state, data: sortedData, sortConfig: newSortConfig };
  
      case 'SET_DATA':
        return {
          ...state,
          data: action.payload,
          sortConfig: {
            assetClass: 'none',
            price: 'none',
            ticker: 'none',
          }
        };
  
      default:
        return state;
    }
  }
    

  export function useSort(initialData: TableItem[]) {
    const [{ data, sortConfig }, dispatch] = useReducer(tableSortReducer, initialState);
  
      // Effect to set initial data
  useEffect(() => {
    dispatch({ type: 'SET_DATA', payload: initialData });
  }, [initialData]);

    const toggleSort = (columnName: 'assetClass' | 'price' | 'ticker') => {
      dispatch({ type: 'TOGGLE_SORT', columnName });
    };
  
    return { sortedData: data, toggleSort, sortConfig };
  }
    