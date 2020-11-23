# Project32 Front End

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
This test runner in watch mode does **_not_** collect coverage.

### `npm test -- --coverage --watchAll=false`

Runs all test suites once only and produces a coverage report in lcov, clover, html and json formats, as well as printing the results to the console.
Navigate to [./coverage/locv-report/index.html](./coverage/locv-report/index.html) to view an interactive report in the browser.

_This command should also be used in pipelines to execute a testing stage_

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

For a simple deployment, copy the entire contents of the `./build` directory to an static hosting bucket.

To test this locally,

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
