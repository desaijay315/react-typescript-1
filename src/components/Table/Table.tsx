import React, { useEffect, useState } from 'react';
import { useSort } from './hooks/useSort';
import { useTableData } from './hooks/useTableData';
import { TableSchema } from '../../models/table';
import '../../styles/Table.css';

interface TableProps {
  schema: TableSchema;
}

interface TableItem {
  ticker: string;
  price: number;
  assetClass: string;
}
export const initialData: TableItem[] = [  { ticker: "ALPHA", price: 100, assetClass: "Credit" },
{ ticker: "BETA", price: 200, assetClass: "Equities" },
{ ticker: "ETA", price: 150, assetClass: "Macro" },
{ ticker: "DELTA", price: 120, assetClass: "Equities" },
{ ticker: "GAMMA", price: 180, assetClass: "Credit" },
{ ticker: "ZETA", price: 300, assetClass: "Macro" },
{ ticker: "THETA", price: 250, assetClass: "Equities" },
{ ticker: "LAMBDA", price: 130, assetClass: "Macro" },
{ ticker: "SIGMA", price: 110, assetClass: "Credit" },
{ ticker: "OMEGA", price: 210, assetClass: "Equities" },
{ ticker: "KAPPA", price: 190, assetClass: "Macro" },
{ ticker: "XI", price: 170, assetClass: "Credit" },
{ ticker: "PI", price: 290, assetClass: "Equities" },
{ ticker: "RHO", price: 220, assetClass: "Macro" },
{ ticker: "NU", price: 240, assetClass: "Credit" },
{ ticker: "MU", price: 260, assetClass: "Equities" },
{ ticker: "PSI", price: 140, assetClass: "Macro" },
{ ticker: "CHI", price: 160, assetClass: "Credit"}];


const Table: React.FC<TableProps> = ({ schema }) => {
 // const { data: initialData } = useTableData();
 const { sortedData, toggleSort, sortConfig } = useSort(initialData);

  return (
<div className="container mt-3">
  <div className="table-responsive">
    <table className="table table-striped table-hover table-bordered">
      <thead className="thead-dark">
          <tr>
            <th scope="col" onClick={() => toggleSort('assetClass')}>Asset Class {sortConfig.assetClass === 'asc' ? '↑' : '↓'}</th>
            <th scope="col" onClick={() => toggleSort('price')}>Price {sortConfig.price === 'asc' ? '↑' : '↓'}</th>
            <th scope="col" onClick={() => toggleSort('ticker')}>Ticker {sortConfig.ticker === 'asc' ? '↑' : '↓'}</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index}>
              <td>{item.assetClass}</td>
              <td>{item.price}</td>
              <td>{item.ticker}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Table;