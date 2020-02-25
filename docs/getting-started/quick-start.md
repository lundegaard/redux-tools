# Quick Start

Let's take a look on how we'd use Redux Tools in a simple React app.

## Global Injection

This is the go-to way to use Redux Tools in standard SPAs.

_**duck.js**_

- a duck file (see [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux))
- exports a reducer and an action creator

```js
import { makeActionTypes, makeConstantActionCreator, makeReducer } from '@redux-tools/actions';

export const ActionTypes = makeActionTypes('duck', ['INCREMENT']);
export const increment = makeConstantActionCreator(ActionTypes.INCREMENT);

export default makeReducer([[ActionTypes.INCREMENT, count => count + 1]], 0);
```

_**Counter.js**_

- a connected React component
- can visualize a number from Redux
- can dispatch an `INCREMENT` action

```js
import React from 'react';
import { o } from 'ramda';
import { withReducers } from '@redux-tools/reducers-react';
import { connect } from 'react-redux';

import countReducer, { increment } from './duck';

const Counter = ({ count, increment }) => <button onClick={increment}>{count}</button>;

const enhance = o(
	withReducers({ count: countReducer }, { isGlobal: true }),
	connect(
		state => ({ count: state.count }),
		{ increment }
	)
);

export default enhance(Counter);
```

_**index.js**_

- the root of our application
- responsible for creating the Redux store and integrating Redux Tools into it
- connects the React application to the Redux store

```js
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { makeEnhancer as makeReducersEnhancer } from '@redux-tools/reducers';
import { Provider } from 'react-redux';
import { identity } from 'ramda';

import Counter from './Counter';

const store = createStore(identity, makeReducersEnhancer());

render(
	<Provider store={store}>
		<Counter />
	</Provider>,
	document.getElementById('root')
);
```

The state structure will look like this:

```json
{
	"count": 0
}
```

## Namespaced Injection

This is the go-to way to use Redux Tools if any of these apply:

- Your application is cleary split into standalone modules which rarely communicate with one another.
- Your application consists of widgets which store their data in Redux and can be mounted multiple times.

_**duck.js**_

- a duck file (see [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux))
- exports a reducer and an action creator

```js
import { makeActionTypes, makeConstantActionCreator, makeReducer } from '@redux-tools/actions';

export const ActionTypes = makeActionTypes('duck', ['INCREMENT']);
export const increment = makeConstantActionCreator(ActionTypes.INCREMENT);

export default makeReducer([[ActionTypes.INCREMENT, count => count + 1]], 0);
```

_**Counter.js**_

- a connected React component
- expects a `namespace` prop to be passed to it
- can visualize a number from a specified Redux namespace
- can dispatch an `INCREMENT` action to a specified Redux namespace

```js
import React from 'react';
import { o } from 'ramda';
import { withReducers, namespacedConnect } from '@redux-tools/reducers-react';

import countReducer, { increment } from './duck';

const Counter = ({ count, increment }) => <button onClick={increment}>{count}</button>;

const mapStateToProps = namespacedState => ({ count: namespacedState.count });
const mapDispatchToProps = { increment };

const enhance = o(
	withReducers({ count: countReducer }),
	// NOTE: `namespacedConnect` is just like `connect`, but it works over namespaces
	namespacedConnect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Counter);
```

_**index.js**_

- the root of our application
- responsible for creating the Redux store and integrating Redux Tools into it
- connects the React application to the Redux store

```js
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { makeEnhancer as makeReducersEnhancer } from '@redux-tools/reducers';
import { Provider } from 'react-redux';
import { identity } from 'ramda';

import Counter from './Counter';

const store = createStore(identity, makeReducersEnhancer());

render(
	<Provider store={store}>
		<Counter namespace="foo" />
		<Counter namespace="bar" />
		<Counter namespace="baz" />
	</Provider>,
	document.getElementById('root')
);
```

The state structure will look like this:

```json
{
	"namespaces": {
		"foo": { "count": 0 },
		"bar": { "count": 0 },
		"baz": { "count": 0 }
	}
}
```

See more examples in the [examples section](/getting-started/examples).
