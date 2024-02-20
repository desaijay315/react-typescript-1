import { SET_DATA, TOGGLE_SORT } from '../../utils/constants';
import { TableItem } from '../../components/Table/types';
import { ColumnName } from '../../common/types';


export const setData = (payload: TableItem[]) => ({
  type: SET_DATA,
  payload,
});

export const toggleSort = (columnName: ColumnName ) => ({
  type: TOGGLE_SORT,
  columnName,
});
