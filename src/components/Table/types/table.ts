
   export interface TableColumn {
    name: string;
    label: string;
    sortingOrder?: 'asc' | 'desc';
    sortingPriority?: string[];
  }
  
  export interface TableSchema {
    columns: TableColumn[];
  }
  

    // Table item type
export interface TableItem {
  ticker: string;
  price: number;
  assetClass: string;
}
