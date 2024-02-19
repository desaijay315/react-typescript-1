import React, { useEffect } from 'react';
import { useTableData, useSort } from './hooks';
import { TableSchema } from './types/table';
import '../../styles/Table.css';


const Table = () => {
 const { data, fetchData } = useTableData();
 const { sortedData, toggleSort, sortConfig } = useSort(data);

 useEffect(() => {
  fetchData();
 },[]);

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
          <tr key={index} className={item.assetClass.toLowerCase()}>
            <td>{item.assetClass}</td>
            <td className={item.price >= 0 ? 'positivePrice' : 'negativePrice'}>{item.price}</td>
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