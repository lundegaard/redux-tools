# Multi-Instance Components {docsify-ignore-all}

Redux Tools allow you to use the injection mechanism for generic multi-instance components too. This includes cool stuff like data grids, multi-step forms, and carousels.

Assume that you want to have multiple data grids mounted over a single page lifecycle, and you also want to store their state in Redux. To do that, you only need to write a reducer which manages the state of a single data grid, meaning that you never have to distinguish the individual data grids.

```js
import { withReducers } from '@redux-tools/react';
import { DataGridPresenter } from './components';

// This reducer doesn't do anything, it has a static state.
const dataGridReducer = () => ({ data: [] });

const DataGrid = withReducers(dataGridReducer, {
	feature: 'grids',
})(DataGridPresenter);

const Example = () => <DataGrid namespace="DATA_GRID_1" />;
```

After the `<DataGrid namespace="DATA_GRID_1" />` element is mounted, `state.grids.DATA_GRID_1.data` will be an empty array. Any actions dispatched via `namespacedConnect` will only affect this data grid instance, same applies to `withEpics` and `withMiddleware`.

If you want to affect this data grid instance by Redux actions from the outside, you will need to associate these actions with its namespace (i.e. set their `meta.namespace` property). The recommended way to do this is to use the `attachNamespace` utility function from [@redux-tools/namespaces](/packages/namespaces?id=attachNamespace).

## Complex Components

If your multi-instance components get more complex, you might eventually need to access the namespace from some nested components. Use the `withNamespaceProvider` decorator to make the `namespace` prop accessible everywhere via React context.

```js
const feature = 'grids';

const DataGrid = compose(
	withReducers(dataGridReducer, { feature }),
	withNamespaceProvider({ feature })
)(DataGridPresenter);

const Example = () => <DataGrid namespace="DATA_GRID_1" />;
```

This way, the `DATA_GRID_1` namespace is not only passed as a prop, but it is also available to all inner decorators as well as by calling `useNamespace(feature)`.
