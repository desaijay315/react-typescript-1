import { useState, useEffect } from 'react';
import { TableItem, TableSchema } from '../../../models/table';
import { sortData } from '../../../utils/sorting';

export const useSort = (initialData: TableItem[], schema: TableSchema) => {
  const [sortedData, setSortedData] = useState<TableItem[]>(initialData);
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Default sorting when component mounts
    sortDataAndUpdate(initialData, 'assetClass', schema); // Sort by assetClass initially
  }, [initialData, schema]);

  const sortDataAndUpdate = (data: TableItem[], columnName: string, schema: TableSchema) => {
    const sorted = sortData(data, columnName, schema, sortDirection);
    setSortedData(sorted);
    setSortColumn(columnName);
    console.log(columnName, 'columnName', sorted, 'sorted')

  };

  console.log(sortColumn, 'sortColumn', sortDirection, 'sortDirection' )
  const sort = (columnName: string) => {
    if (columnName === sortColumn) {
      console.log(sortColumn, 'sortColumn', sortDirection, 'sortDirection' )

      // Toggle sorting direction if the same column is clicked again
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(newDirection);
    } else {
      // Sort data based on the clicked column
      setSortColumn(columnName);
      setSortDirection('asc'); // Reset sorting direction when changing column
    }
  };

  useEffect(() => {
    // Sort data whenever sortColumn or sortDirection changes
    sortDataAndUpdate(sortedData, sortColumn, schema);
  }, [sortColumn, sortDirection, schema, sortedData]);

  return { sortedData, sort };
};
