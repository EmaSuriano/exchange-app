import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { initializeState } from './recoil/initializers';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot initializeState={initializeState}>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
