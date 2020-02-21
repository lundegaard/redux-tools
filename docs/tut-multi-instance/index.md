# Multi-Instance Components

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
