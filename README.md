# exchange-app

[![Build Status](https://travis-ci.com/EmaSuriano/exchange-app.svg?branch=master)](https://travis-ci.com/EmaSuriano/exchange-app)

> Open Source Exchange Application based on [Open Exchange Rate](https://openexchangerates.org/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## [Live Demo ✨](https://emasuriano.github.io/exchange-app/)

## Features 🚀

- Conversion between 3 different currencies: USD, EUR and GBP
- Exchange Rate based on [Open Exchange Rate](https://openexchangerates.org/)
- Save Pocket amount between session by using Local Storage API.
- Responsive and Simple Design

## Lighthouse Score 💯

![Lighthouse Score](images/2020-07-16-13-59-25.png)

## Stack 🔌

- [Recoil](https://recoiljs.org/): State Management
- [Grommet](https://v2.grommet.io/): Design System powered by [styled-components](https://styled-components.com/)
- [Typescript](https://www.typescriptlang.org/): Project compiler
- [Jest](https://jestjs.io/): Test runner
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro): Testing library
- [Es-lint](https://eslint.org/): Project linter
- [Prettier](https://prettier.io/): Code formatter
- [Travis CI](https://travis-ci.com/): CI setup

## Available Scripts 📝

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn lint`

Run `eslint` with `react-app` configuration

## Design 🎨

Thanks to Grommet responsiveness, the application is able to adapt very well to several screen sizes.

| Desktop                                          | Tablet                                          | Mobile                                          |
| ------------------------------------------------ | ----------------------------------------------- | ----------------------------------------------- |
| ![Home Desktop](images/2020-07-16-13-45-11.png)  | ![Home Tablet](images/2020-07-16-13-45-29.png)  | ![Home Mobile](images/2020-07-16-13-45-54.png)  |
| ![Modal Desktop](images/2020-07-16-13-46-18.png) | ![Modal Tablet](images/2020-07-16-13-46-33.png) | ![Modal Mobile](images/2020-07-16-13-49-00.png) |

## CI Configuration 🤖

Travis will execute the following commands in all the branches of the project:

- yarn lint
- yarn test
- yarn build

Every time a commit is pushed to `master` it will deploy the website to Github Pages.

For more information about the Travis CI configuration, refer to [.travis.yml](./.travis.yml).

## Development Warnings ⚠️

When running the project locally, there is a warning that exists on every component using `useRecoilState` or `useRecoilValue`. The error has the following information:

```plain
1.chunk.js:99662 Warning: Cannot update a component (`Batcher`) while rendering a different component (`ExchangePanel`). To locate the bad setState() call inside `ExchangePanel`, follow the stack trace as described in https://fb.me/setstate-in-render
    in ExchangePanel (at App.tsx:37)
    in div (created by StyledBox)
    in StyledBox (created by Box)
    in Box (at App.tsx:31)
    in div (created by StyledBox)
    in StyledBox (created by Box)
    in Box (at App.tsx:30)
    in form (created by Form)
    in Form (at App.tsx:29)
    in main (created by StyledBox)
    in StyledBox (created by Box)
    in Box (created by Main)
    in Main (at App.tsx:18)
    in App (at src/index.tsx:13)
    in div (created by StyledGrommet)
    in StyledGrommet (created by Grommet)
    in Grommet (at src/index.tsx:12)
    in RecoilRoot (at src/index.tsx:11)
    in StrictMode (at src/index.tsx:10)
```

This issue has already been reported and the recoil team is working on it. To know more about this issue, please follow [this thread](https://github.com/facebookexperimental/Recoil/issues/12).

## License

MIT.
