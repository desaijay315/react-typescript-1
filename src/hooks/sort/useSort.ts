import { useReducer, useEffect } from 'react';
import { TableItem } from '../../components/Table/types';
import { sortReducer } from './sortReducer';
import { initialState } from '../sort/initialState';
import { SET_DATA, TOGGLE_SORT } from '../../utils/constants';
import { ColumnName } from '../../common/types';


  export function useSort(initialData: TableItem[]) {
    const [{ data, sortConfig }, dispatch] = useReducer(sortReducer, initialState);

    //dispatch to get the initial data
  useEffect(() => {
    dispatch({ type: SET_DATA, payload: initialData });
  }, [initialData]);

    const toggleSort = (columnName: ColumnName) => {
      dispatch({ type: TOGGLE_SORT, columnName });
    };
  
    return { sortedData: data, toggleSort, sortConfig };
  }
    