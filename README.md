# Redux tools

A collection of Redux libraries for modular applications, such as those utilizing [React-union](https://github.com/lundegaard/react-union) or other SPA-in-CMS solutions. They allow you to easily:

- tie reducers and epics to your widgets and handle their lifecycle, i.e. injection and ejection, automatically.
- isolate your widgets' Redux state while still allowing them to communicate with one another.

They offer seamless integration with React and React-union. See the [packages](/packages) and the [FAQ](FAQ.md) for more details!

## Packages

- [actions](packages/actions/README.md) – Functions for creating [FSA-compliant](https://github.com/redux-utilities/flux-standard-action) action creators and reducers.
- [reducers](packages/reducers/README.md) – Redux store enhancer for asynchronous injection of reducers.
- [reducers-react](packages/reducers-react/README.md) – React bindings for the reducers package.
- [epics](packages/epics/README.md) – Redux store enhancer for asynchronous injection of epics.
- [epics-react](packages/epics-react/README.md) – React bindings for the epics package.
- [stream-creators](packages/stream-creators/README.md) – Collection of stream creators for the epics package.
- [utils](packages/utils/README.md) – Various utility functions not tied to the redux-tools domain.

The following packages are used internally and are not meant to be used directly in your application code. You might want to use them for some custom features or more advanced integration, though.

- [namespaces](packages/namespaces/README.md) – Logic for associating Redux actions with a namespace.
- [injectors](packages/injectors/README.md) – Internal reusable logic for the injection mechanism itself.
- [injectors-react](packages/injectors-react/README.md) – Core React injector functionality.

## Usage

This example uses React, but the tools are platform agnostic. You should already know the basics of Redux before using this library!

We will be creating a simple click counter, which will have its state stored in Redux. The catch is that we should have a variable number of isolated counters on a single page!

```js
// duck.js
import { makeConstantActionCreator, makeReducer } from '@redux-tools/actions';
import { prefixedValueMirror } from '@redux-tools/utils';

export const ActionTypes = prefixedValueMirror('duck', ['INCREMENT']);
export const increment = makeConstantActionCreator(ActionTypes.INCREMENT);

export default makeReducer([[ActionTypes.INCREMENT, count => count + 1]], 0);
```

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
	withReducers({ count: countReducer }), // This handles the asynchronous reducer injection.
	namespacedConnect(mapStateToProps, mapDispatchToProps) // This is just like `connect` from react-redux
);

export default enhance(Counter);
```

```js
// index.js
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider, enhancer as injectableReducers } from '@redux-tools/reducers';
import { identity } from 'ramda';

import Counter from './Counter';

// `injectableReducers()` is an enhancer just like `applyMiddleware()`, so they're composable!
const store = createStore(identity, injectableReducers());

render(
	<Provider store={store}>
		<CounterContainer namespace="foo" />
		<CounterContainer namespace="bar" />
		<CounterContainer namespace="baz" />
	</Provider>,
	document.getElementById('root')
);
```

And that's it!
