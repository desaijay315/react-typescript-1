
   export interface TableColumn {
    name: string;
    label: string;
    sortingOrder?: 'asc' | 'desc';
    sortingPriority?: string[];
  }
  
  export interface TableSchema {
    columns: TableColumn[];
  }
  

  export enum SortActionType {
    SORT = 'SORT',
  }
  
  export interface SortAction {
    type: SortActionType.SORT;
    payload: {
      columnName: string;
    };
  }
  

  // Table item type
export interface TableItem {
  ticker: string;
  price: number;
  assetClass: string;
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
