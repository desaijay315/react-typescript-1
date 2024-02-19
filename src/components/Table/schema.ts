import { TableSchema } from '../../models/table';

export const tableSchema: TableSchema = {
  columns: [
    { name: 'assetClass', label: 'Asset Class', sortingPriority: ['Equities', 'Macro', 'Credit'] },
    { name: 'price', label: 'Price', sortingOrder: 'desc' },
    { name: 'ticker', label: 'Ticker', sortingOrder: 'asc' },
  ],
};
