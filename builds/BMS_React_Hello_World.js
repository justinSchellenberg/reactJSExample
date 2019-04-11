import React from 'react';
import ReactDOM from 'react-dom';
import ThemeSettings from '../ThemeSettings/ThemeSettings';
import App from '../react/App';
import './test.scss';

window.BOLD = window.BOLD || {};
window.BOLD.BMS = window.BOLD.BMS || {};
window.BOLD.BMS.BUILDS = window.BOLD.BMS.BUILDS || {};

const initializeApp = (AppRoot, data) => {
  Object.freeze(ThemeSettings.createInstance(data)); // Please Don't Modify this object, If you need to modify it make your own Clone!
  ReactDOM.render(<App />, AppRoot);
}

window.BOLD.BMS.BUILDS.reactApp = initializeApp;
