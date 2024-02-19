export interface TableItem {
    [key: string]: string | number;
  }
  
  export interface TableColumn {
    name: string;
    label: string;
    sortingOrder?: 'asc' | 'desc';
    sortingPriority?: string[];
  }
  
  export interface TableSchema {
    columns: TableColumn[];
  }
  