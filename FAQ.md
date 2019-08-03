# FAQ

This FAQ provides reasons for using @redux-tools and explains some of the decisions that we've made during development.

## What's the use case?

@redux-tools are a good choice if you answer "Yes!" to any of these questions.

- Do you want to isolate the Redux state of our widgets while still allowing them to communicate with one another?
- Do you want to associate your reducers and epics with your widget, so that they're injected and ejected when needed?
- Do your selectors include a lot of boilerplate code for accessing widget state?
  - For example, you may want to replace `state => state.widgets.a.something` with `state => state.something`.

@redux-tools aim to solve all of these issues automatically, yet transparently.

## Why not use something like redux-subspace and redux-dynostore?

We think that our implementation is simpler, more transparent and more fit for our use case, especially regarding integration with CMSs.

## How to use @redux-tools with React-union?

1. Replace the react-redux `<Provider />` with one from `@redux-tools`.
2. Pass `() => useContext(WidgetContext).namespace` as the `useNamespace` prop.

That's it! Now when you use e.g. `withReducers` or `namespacedConnect` in your widget, it will always access the correct namespace.

## Can I use @redux-tools without React?

Of course!

## Can I use @redux-tools without redux-observable?

Absolutely!

## Redux DevTools have stopped working for me. How do I fix them?

You might need to configure the DevTools slightly.

```js
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const composeEnhancers = composeWithDevTools({
	latency: 0,
	// NOTE: This might help in some versions of Redux DevTools.
	// shouldHotReload: false,
});
```

See the [API Documentation](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md) for more info.

## What are features and how do I use them?

@redux-tools allow you to use the injection mechanism for generic multi-instance components e.g. data grids!

Assume that you want to have multiple data grids mounted over a single page lifecycle, and you also want to store their state in Redux. To do that, you only need to write a reducer which manages the state of a single data grid, meaning that you never have to distinguish the individual data grids.

```js
// This reducer doesn't do anything, it has a static state.
const dataGridReducer = R.always({ data: [] });

const DataGridOne = withReducers(dataGridReducer, {
	feature: 'grids',
	namespace: 'DATA_GRID_1',
})(DataGrid);
```

After mounting the `<DataGridOne />` component, `state.grids.DATA_GRID_1.data` will be an empty array. If you want to affect this data grid instance by Redux actions, you need to associate these actions with a namespace somehow (i.e. set their `meta.namespace` property).

- Dispatching from React components:

  - Use the `namespacedConnect` decorator, making sure to pass a namespace to it somehow:
    - Wrapping the component in a @redux-tools `<Provider namespace={namespace}>`.
    - Passing a `namespace` prop to the decorated component.
    - Using a static namespace like this: `namespacedConnect(mstp, mdtp, undefined, { namespace })`)

- Dispatching from epics or middleware:

  - The first option is to use the `attachNamespace(namespace, action)` utility function to associate an action with a namespace before dispatching it. Internally, @redux-tools will preserve this manually-set namespace.
  - Another option is to inject the epics/middleware with the appropriate namespace (same as using the `namespacedConnect` decorator). All dispatched actions will have their namespace set automatically.

## How do I mix multiple namespaces?

If you need to mix multiple namespaces, keep in mind that if an injectable (e.g. a reducer) is injected under a namespace, **it won't listen to actions from other namespaces**. This is to keep e.g. individual data grids as isolated as possible. However, you're still able to use the `attachNamespace` function in namespaced epics/middleware.

_NOTE: Globally injected injectables always listen to all actions._

If you need to mix multiple namespaces across various features in a nested fashion (e.g. when using data grids within widgets), you can use the @redux-tools `<Provider />` like this:

```js
<Provider namespace="users">
	<DecoratedUserForm />
	<Provider namespace="users-data-grid-1" feature="grids">
		<DecoratedDataGrid />
	</Provider>
	<Provider namespace="users-data-grid-2" feature="grids">
		<DecoratedDataGrid />
	</Provider>
</Provider>
```

This way, the decorators will always access the appropriate namespace. Note that the decorators always fall back to the default feature (`namespaces`) for retrieving the namespace.
