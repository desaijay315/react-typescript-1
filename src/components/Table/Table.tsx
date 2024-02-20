import { useEffect } from 'react';
import { useTableData, useSort } from '../../hooks';
import '../../styles/Table.css';
import { ASC, ASSET_CLASS, PRICE, TICKER, UP_ARROW, DOWN_ARROW, NEGATIVE_PRICE, POSITIVE_PRICE } from '../../utils/constants';

const Table = () => {
 const { data, InstrumentsData } = useTableData();
 const { sortedData, toggleSort, sortConfig } = useSort(data);

 useEffect(() => {
  InstrumentsData();
 },[]);

  return (
<div className="container mt-3">
  <div className="table-responsive">
    <table className="table table-striped table-hover table-bordered">
      <thead className="thead-dark">
          <tr>
            <th scope="col" onClick={() => toggleSort(ASSET_CLASS)}>Asset Class {sortConfig.assetClass === ASC ? UP_ARROW : DOWN_ARROW}</th>
            <th scope="col" onClick={() => toggleSort(PRICE)}>Price {sortConfig.price === ASC ? UP_ARROW : DOWN_ARROW}</th>
            <th scope="col" onClick={() => toggleSort(TICKER)}>Ticker {sortConfig.ticker === ASC ? UP_ARROW : DOWN_ARROW}</th>
          </tr>
        </thead>
        <tbody>
        {sortedData.map((item, index) => (
          <tr key={index} className={item.assetClass.toLowerCase()}>
            <td>{item.assetClass}</td>
            <td className={item.price >= 0 ? POSITIVE_PRICE : NEGATIVE_PRICE}>{item.price}</td>
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