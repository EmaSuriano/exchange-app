import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
import { initializeState, restoreState } from './recoil/initializers';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import GithubCorner from 'react-github-corner';

const stateFromLocalStorage = restoreState();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot initializeState={initializeState(stateFromLocalStorage)}>
      <Grommet theme={grommet} full>
        <App />
        <GithubCorner
          href="https://github.com/EmaSuriano/exchange-app"
          bannerColor="#7D4CDB"
        />
      </Grommet>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
);
