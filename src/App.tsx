import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/Table/Table';
import { tableSchema } from './components/Table/schema';
import './styles/app.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Financial Instruments Data</h1>
      <Table schema={tableSchema} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
