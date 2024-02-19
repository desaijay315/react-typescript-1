import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

const App: React.FC = () => {
    return <div className="helloworld"> React,Webpack4,Babel7!</div>;
  };

  export { App };
  

ReactDOM.render(<App />, document.querySelector("#root"));
