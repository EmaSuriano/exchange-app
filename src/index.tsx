import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { initializeState } from './recoil/initializers';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot initializeState={initializeState}>
      <Grommet theme={grommet} full>
        <App />
      </Grommet>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
