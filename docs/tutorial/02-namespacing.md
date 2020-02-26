# Namespacing {docsify-ignore-all}

Let's assume that we've got a widget that can be used multiple times on a single page. The catch: it should store its data in Redux. Furthermore, every instance of the widget should have its own isolated state. Redux Tools offer a mechanism to handle this.

Enter [namespaces](/packages/namespaces).

The simplest example we could think of is a click counter.

```js
import React from 'react';
import { o } from 'ramda';
import { makeActionTypes, makeConstantActionCreator, makeReducer } from '@redux-tools/actions';
import { withReducers, namespacedConnect } from '@redux-tools/reducers-react';

const ActionTypes = makeActionTypes('duck', ['INCREMENT']);
const increment = makeConstantActionCreator(ActionTypes.INCREMENT);
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
- Use a namespace context provider.

First, let's render a bunch of counters using the first method.

```js
<EnhancedCounter namespace="foo" />
<EnhancedCounter namespace="bar" />
<EnhancedCounter namespace="baz" />
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

Under the hood, `withReducers` will inject the reducers at `state.namespaces.foo` because it has received the `namespace="foo"` prop. Furthermore, `namespacedConnect` will access the `state.namespaces.foo` state, because it too has received the `namespace="foo"` prop.

When the `INCREMENT` action is dispatched, the action will look like this:

```js
const action = {
	type: 'INCREMENT',
	meta: { namespace: 'foo' },
};
```

The `meta.namespace` attribute was added automatically by `namespacedConnect`. What's the point of that?

Because our counter was mounted three times, there are three instances of our reducers injected as well, each with a different namespace. If an action has a different namespace than the reducer's, **it will be ignored**.

Using the `namespace` prop is pretty simple, but it doesn't scale well if you need to use `withReducers` deeper in the React component tree. That's when the namespace provider comes in handy.

## Namespace Provider

There are essentially three approaches to using this component:

1. You do not need to handle namespacing at all.

   - Don't use this component.

2. You are able to access the current namespace using React context from anywhere inside a widget and you are using a single virtual DOM for all widgets.

   - You can wrap the entire application in a single `<Provider useNamespace={useNamespace}>` component and you are done! This is the approach that should be used e.g. with React Union.

3. You are not using a single virtual DOM or you cannot reliably access the namespace from a nested component.

   - You should resort to wrapping each widget separately by using `<Provider namespace={namespace}>` instead. This is the go-to approach if you are rendering the widgets manually.

```js
import { Provider } from '@redux-tools/reducers-react';

<Provider namespace="foo">
  <EnhancedCounter />
</Provider>

<Provider namespace="bar">
  <EnhancedCounter />
</Provider>
```

Even if our counters were more complex, we will always access the correct namespace without the need to pass it down.

## Automatic Namespace Resolution

This is probably something you want to do if you have a custom widget rendering architecture (like React Union).

```js
const NamespaceContext = React.createContext(null);

const renderWidget = (Widget, namespace) => (
	<NamespaceContext.Provider value={namespace}>
		<Widget />
	</NamespaceContext.Provider>
);

const useNamespace = () => useContext(NamespaceContext);

const App = () => (
	<Provider useNamespace={useNamespace}>
		{renderWidget(EnhancedCounter, 'foo')}
		{renderWidget(EnhancedCounter, 'bar')}
		{renderWidget(EnhancedCounter, 'baz')}
	</Provider>
);

export default App;
```
