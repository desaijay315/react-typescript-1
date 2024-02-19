import { TableItem, TableSchema } from '../models/table';

// Define type for the custom sorting order
interface AssetClassOrder {
  [key: string]: number;
}

export const sortData = (data: TableItem[], columnName: string, schema: TableSchema, direction: 'asc' | 'desc'): TableItem[] => {
  // Sorting logic based on column name
  switch (columnName) {
    case 'assetClass':
      const assetClassOrder: AssetClassOrder = {
        'Equities': 1,
        'Macro': 2,
        'Credit': 3
      };
      return data.sort((a, b) => {
        const order = direction === 'asc' ? 1 : -1;
        return order * (assetClassOrder[a.assetClass] - assetClassOrder[b.assetClass]);
      });
    case 'price':
      return data.sort((a, b) => {
        const order = direction === 'asc' ? 1 : -1;
        return order * ((b.price as number) - (a.price as number));
      });
    case 'ticker':
      return data.sort((a, b) => {
        const order = direction === 'asc' ? 1 : -1;
        return order * ((a.ticker as string).localeCompare(b.ticker as string));
      });
    default:
      return data;
  }
};
