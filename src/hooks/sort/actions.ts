import { SET_DATA, TOGGLE_SORT } from '../../constants';
import { TableItem } from '../../components/Table/types/table';
import { ColumnName } from './types';



export const setData = (payload: TableItem[]) => ({
  type: SET_DATA,
  payload,
});

export const toggleSort = (columnName: ColumnName ) => ({
  type: TOGGLE_SORT,
  columnName,
});
