import { SortAction, SortState } from './types';
import { sortDirectionToggle } from '../../../../utils/sorting'; 
import { ASSET_CLASS_ORDER, TOGGLE_SORT, SET_DATA, ASC, DESC, NONE, ASSET_CLASS, PRICE, TICKER } from '../../../../constants';

export const tableSortReducer = (state: SortState, action: SortAction): SortState => {
    switch (action.type) {
      case TOGGLE_SORT:
        const newSortConfig = { ...state.sortConfig };
        let sortedData = [...state.data];
  
        if (action.columnName === ASSET_CLASS) {
          newSortConfig.assetClass = sortDirectionToggle(state.sortConfig.assetClass);
          sortedData.sort((a, b) => {
            const orderA = ASSET_CLASS_ORDER.indexOf(a.assetClass);
            const orderB = ASSET_CLASS_ORDER.indexOf(b.assetClass);
            return newSortConfig.assetClass === ASC ? orderA - orderB : orderB - orderA;
          });
        }
  
        if (action.columnName === PRICE) {
          newSortConfig.price = state.sortConfig.price === NONE ? DESC : sortDirectionToggle(state.sortConfig.price);
          sortedData.sort((a, b) => newSortConfig.price === ASC ? a.price - b.price : b.price - a.price);
        }
  
        if (action.columnName === TICKER) {
          newSortConfig.ticker = state.sortConfig.ticker === NONE ? DESC : sortDirectionToggle(state.sortConfig.ticker);
          sortedData.sort((a, b) => newSortConfig.ticker === ASC ? a.ticker.localeCompare(b.ticker) : b.ticker.localeCompare(a.ticker));
        }
  
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
    
