import { useReducer, useEffect } from 'react';
import { TableItem } from '../../types/table';
import { tableSortReducer } from '../sort/tableSortReducer';
import { initialState } from '../sort/initialState';
import { ColumnName } from './types';
import { SET_DATA, TOGGLE_SORT } from '../../../../constants';


  export function useSort(initialData: TableItem[]) {
    const [{ data, sortConfig }, dispatch] = useReducer(tableSortReducer, initialState);

    //dispatch to get the initial data
  useEffect(() => {
    dispatch({ type: SET_DATA, payload: initialData });
  }, [initialData]);

    const toggleSort = (columnName: ColumnName) => {
      dispatch({ type: TOGGLE_SORT, columnName });
    };
  
    return { sortedData: data, toggleSort, sortConfig };
  }
    