// import here is like `require()` in node
// This is an ES6 thing, not a React thing, but ES6 is almost always used in React
// exports in the other files allow it to be imported here (just like node's module.exports)

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

// This is your link between the "real world" and react's magic land -- this is what ties you to the real DOM
// finds the element on the dom where id="root" and replaces the content with the export of App.js
// this is similar to ng-view or ui-view in angularjs
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
