import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { initializeState, restoreState } from './recoil/initializers';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';

const stateFromLocalStorage = restoreState();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot initializeState={initializeState(stateFromLocalStorage)}>
      <Grommet theme={grommet} full>
        <App />
      </Grommet>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
