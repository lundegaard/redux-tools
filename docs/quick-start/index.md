# Quick Start

## Simple React + Redux-Tools example

_**duck.js**_

- a duck file (see [Ducks: Redux Reducer Bundles](https://github.com/erikras/ducks-modular-redux))
- exports reducer and action creator

```js
// duck.js
import { makeActionTypes, makeConstantActionCreator, makeReducer } from '@redux-tools/actions';

export const ActionTypes = makeActionTypes('duck', ['INCREMENT']);
export const increment = makeConstantActionCreator(ActionTypes.INCREMENT);

export default makeReducer([[ActionTypes.INCREMENT, count => count + 1]], 0);
```

_**Counter.js**_

- a universal component for visualizing number "count" from specified namespace and
  calling an increment action

```js
// Counter.js
import React from 'react';
import { o } from 'ramda';
import { withReducers, namespacedConnect } from '@redux-tools/reducers-react';

import countReducer, { increment } from './duck';

const Counter = ({ count, increment }) => <button onClick={increment}>{count}</button>;

const mapStateToProps = namespacedState => ({ count: namespacedState.count });
const mapDispatchToProps = { increment };

const enhance = o(
	// This handles the asynchronous reducer injection/ejection
	withReducers({ count: countReducer }),
	// This is just like `connect` from react-redux
	namespacedConnect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Counter);
```

_**index.js**_

- a root component
- connects react to redux and defines namespaces for Counters

```js
// index.js
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { makeEnhancer as makeReducersEnhancer } from '@redux-tools/reducers';
import { Provider } from '@redux-tools/reducers-react';
import { identity } from 'ramda';

import Counter from './Counter';

// `makeReducersEnhancer()` is an enhancer just like `applyMiddleware()`, so they're composable
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

You can find more examples in [our repository]().

!> TODO: Add link
