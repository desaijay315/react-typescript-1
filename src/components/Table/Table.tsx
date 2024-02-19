import React, { useEffect, useState } from 'react';
import { useSort } from './hooks/useSort';
import { useTableData } from './hooks/useTableData';
import { TableSchema } from '../../models/table';
import '../../styles/Table.css';

interface TableProps {
  schema: TableSchema;
}

const Table: React.FC<TableProps> = ({ schema }) => {
  const { data } = useTableData();
  const { sortedData, sort } = useSort(data, schema);

  console.log(sortedData, 'sortedData-xx')
  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  return (
    
    <div className="table-container">
          <pre>{JSON.stringify(sortedData, null, 2)}</pre>

    <table className="table">
      <thead>
        <tr>
          {schema.columns.map((column) => (
            <th key={column.name} onClick={() => sort(column.name)}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            {schema.columns.map((column) => (
              <td key={column.name}>{row[column.name]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
