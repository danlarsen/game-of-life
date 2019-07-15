import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		ReactDOM.render(<App width="10" height="10" />, document.getElementById('app-body'));
	},
	false
);
