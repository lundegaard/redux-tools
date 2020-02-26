# Multi-Instance Components

Redux Tools allow you to use the injection mechanism for generic multi-instance components too. This includes cool stuff like data grids, multi-step forms, and carousels.

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
    - Wrapping the component in a Redux Tools' `<Provider namespace={namespace}>`.
    - Passing a `namespace` prop to the decorated component.
    - Passing a static namespace: `namespacedConnect(mstp, mdtp, undefined, { namespace })`).

- Dispatching from epics or middleware:

  - The first option is to use the `attachNamespace(namespace, action)` utility function to associate an action with a namespace before dispatching it. Internally, Redux Tools will preserve this manually-set namespace.
  - Another option is to inject the epics/middleware with the appropriate namespace (same as using the `namespacedConnect` decorator). All dispatched actions will have their namespace set automatically.
