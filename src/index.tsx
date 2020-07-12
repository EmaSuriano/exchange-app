import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { setFakeData } from './recoilState';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot initializeState={setFakeData}>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
