import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import Root from './Root';

// Render the main component (root) into the dom
ReactDOM.render(<Root history={browserHistory} />, document.getElementById('app'));

// browserHistory is passed down to Root against the DOM element app
