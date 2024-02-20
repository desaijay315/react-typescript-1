import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table/Table';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Financial Instruments Data</h1>
      <Table />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
