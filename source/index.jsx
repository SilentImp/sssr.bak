import React from 'react';
import ReactDOM from 'react-dom';
import ExamplePage from './components/example';

ReactDOM.hydrate(
  <ExamplePage />,
  document.getElementById('root')
);
