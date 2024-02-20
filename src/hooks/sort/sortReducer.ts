import { SortAction, SortState } from './types';
import { sortDirectionToggle } from '../../utils/helpers'; 
import { ASSET_CLASS_ORDER, TOGGLE_SORT, SET_DATA, ASC, DESC, NONE, ASSET_CLASS, PRICE, TICKER } from '../../utils/constants';
import { TableItem } from '../../components/Table/types';
import { ColumnName } from '../../common/types';

type SortFunction = (a: TableItem, b: TableItem, direction: string) => number;

const sortFunctions: { [key in ColumnName]: SortFunction } = {
  [ASSET_CLASS]: (a, b, direction) => {
    const orderA = ASSET_CLASS_ORDER.indexOf(a.assetClass);
    const orderB = ASSET_CLASS_ORDER.indexOf(b.assetClass);
    return direction === ASC ? orderA - orderB : orderB - orderA;
  },
  [PRICE]: (a, b, direction) => direction === ASC ? a.price - b.price : b.price - a.price,
  [TICKER]: (a, b, direction) => direction === ASC ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker),
};  


export const sortReducer = (state: SortState, action: SortAction): SortState => {
    switch (action.type) {
      case TOGGLE_SORT:
        const column = action.columnName;
        const newSortConfig = { ...state.sortConfig };
        let sortedData = [...state.data];

        if (column === ASSET_CLASS) {
          newSortConfig.assetClass = sortDirectionToggle(state.sortConfig.assetClass);
        } else {
          newSortConfig[column] = state.sortConfig[column] === NONE ? DESC : sortDirectionToggle(state.sortConfig[column]);
        }  

        sortedData.sort((a, b) => sortFunctions[column](a, b, newSortConfig[column]));


        return { ...state, data: sortedData, sortConfig: newSortConfig };
  
      case SET_DATA:
        return {
          ...state,
          data: action.payload,
          sortConfig: {
            assetClass: NONE,
            price: NONE,
            ticker: NONE,
          }
        };
  
      default:
        return state;
    }
  }
 