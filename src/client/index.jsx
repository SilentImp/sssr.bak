import React from 'react';
import ReactDOM from 'react-dom';
import Page from 'components/example';

const window = typeof window === 'undefined' ? '' : window; // eslint-disable-line
const document = typeof document === 'undefined' ? '' : document; // eslint-disable-line

ReactDOM.hydrate(
  <Page />,
  document.getElementById('root')
);
