# Namespacing

Let's assume that we have to develop a widget that can be used multiple times on a single page. The catch: it should store its data in Redux. Furthermore, every instance of the widget should have its own isolated state. Redux Tools offer a mechanism to handle this very efficiently.

Enter namespaces.

The simplest example we could think of is a click counter.

```js
import React from 'react';
import { o } from 'ramda';
import {
	makeActionTypes,
	makeEmptyActionCreator,
	makeReducer,
	withReducers,
	namespacedConnect,
} from '@redux-tools/react';

const ActionTypes = makeActionTypes('duck', ['INCREMENT']);
const increment = makeEmptyActionCreator(ActionTypes.INCREMENT);
const reducer = makeReducer([[ActionTypes.INCREMENT, count => count + 1]], 0);

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

Okay, this is getting slightly more complex. Our enhanced counter expects a namespace to be provided to it! There are two feasible options to do so:

- Pass a `namespace` prop.
- Use a namespace provider.

First, let's render a bunch of counters using the first method.

```js
<Counter namespace="foo" />
<Counter namespace="bar" />
<Counter namespace="baz" />
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

Under the hood, `withReducers` will inject the reducers at `state.namespaces.foo` because it has received the `namespace="foo"` prop. Furthermore, `namespacedConnect` will access `state.namespaces.foo` because it too has received the `namespace="foo"` prop.

When the `INCREMENT` action is dispatched, the action will look like this:

```js
const action = {
	type: 'INCREMENT',
	meta: { namespace: 'foo' },
};
```

The `meta.namespace` attribute was added automatically by `namespacedConnect`. What's the point of that?

Because our counter was mounted three times, there are three instances of our reducers injected as well, each with a different namespace. If an action has a different namespace than the reducer, **it will be ignored**.

!> Avoid using multiple namespaces within a single widget or module.

Using the `namespace` prop is pretty simple, but it doesn't scale well if you need to use `withReducers` deeper in the React component tree. That's when the namespace provider comes in handy.

## The Namespace Provider

There are two approaches to using this component, let's start with the simpler one.

Wrap each widget separately via a `<NamespaceProvider namespace={namespace} />` element. This is the go-to approach if you are rendering the widgets manually or if the widgets do not share a common React tree, i.e. they are rendered using multiple `ReactDOM.render` calls.

```js
import React, { Fragment } from 'react';
import { NamespaceProvider } from '@redux-tools/react';
import { Counter } from './components';

const CounterExample = () => (
	<Fragment>
		<NamespaceProvider namespace="foo">
			<Counter />
		</NamespaceProvider>
		<NamespaceProvider namespace="bar">
			<Counter />
		</NamespaceProvider>
	</Fragment>
);
```

Even if our counters were more complex, we will always access the correct namespace without the need to pass it down.

The second approach is to wrap all the widgets in a single `<NamespaceProvider useNamespace={useNamespace} />` element. This is the approach you should choose if you are able to access the current widget namespace via React hooks from anywhere.

```js
import React, { createContext, useContext } from 'react';
import { NamespaceProvider } from '@redux-tools/react';
import { Counter } from './components';

const WidgetNamespaceContext = createContext(null);

const renderWidget = (Widget, namespace) => (
	<WidgetNamespaceContext.Provider value={namespace}>
		<Widget />
	</WidgetNamespaceContext.Provider>
);

const useWidgetNamespace = () => useContext(WidgetNamespaceContext);

const CounterExample = () => (
	<NamespaceProvider useNamespace={useWidgetNamespace}>
		{renderWidget(Counter, 'foo')}
		{renderWidget(Counter, 'bar')}
		{renderWidget(Counter, 'baz')}
	</NamespaceProvider>
);
```

Any Redux Tools decorator inside a widget will now access the appropriate namespace without the need to wrap each widget in a separate provider.

## Inter-Namespace Communication

If you need to dispatch an action to a foreign namespace, use `attachNamespace` from [@redux-tools/namespaces](/packages/namespaces?id=attachNamespace). Simple enough, right?

## Usage Guidelines

Namespaces are awesome for developing widgets that can be mounted multiple times in a single page. That being said, if you are developing a standard React application, don't bother with namespaces in your application code. Only use them for developing [custom reusable multi-instance components](/tutorial/03-multi-instance-components).

However, if your application is clearly split into isolated modules that rarely need to communicate with one another, namespaces might be a good choice for you. There is one main rule you should follow: **never use multiple namespaces within a single module**. Seriously.

Compare these two state structures:

```json
{
	"someModule": {},
	"otherModule": {}
}
```

```json
{
	"namespaces": {
		"someModule": {},
		"otherModule": {}
	}
}
```

The second approach will allow you to omit specifying `someModule` and `otherModule` in your selectors – the state slice will be resolved by the namespacing mechanism. However, you'll also have to deal with yet another architectural concept, which might make it difficult for developers who only know the basics of React or Redux.

If you do decide to use namespaces in a standard React application:

- Make sure all of your modules are wrapped in a namespace provider.
- Make sure any common state is managed by a globally injected reducer.
