# Namespaces

> yarn add @redux-tools/namespaces

This package provides the main logic for associating Redux actions with a namespace.

## API Reference

### isActionFromNamespace()

A function that checks if a Redux action is from a certain namespace. Returns `false` when both namespaces are defined and **not** equal, otherwise returns `true`.

There are essentially two edge cases:

- If the action has no namespace, it is a global action and therefore affects **all** namespaces.
- If the tested namespace is undefined, it is a global namespace and is therefore affected by **all** actions.
  - This allows easier usage of other packages (notably using `namespacedConnect` for dispatching actions affecting global reducers and epics, instead of having to use `connect` separately).

**Parameters**

1. [`namespace`] \( _string_ ): The namespace to check against.
2. `action` ( _Action_ ): The Redux action to check. Should have a `meta.namespace` property.

**Returns**

( _boolean_ ): Whether the Redux action is from the specified namespace.

### getNamespaceByAction()

Returns the namespace of an action.

**Parameters**

1. `action` ( _Action_ ): The Redux action to get the namespace of. Should have a `meta.namespace` property.

**Returns**

( _any_ ): The value of the `meta.namespace` property.

### attachNamespace()

Associates an action with a namespace, overwriting any previous namespace.

**Parameters**

1. [`namespace`] \( _string_ ): The namespace to attach.
2. `action` ( _Action_ ): Action to attach the namespace to.

**Returns**

( _Action_ ): A new Redux action with a `meta.namespace` property.

### defaultNamespace()

Associates an action with a namespace unless it is already associated with some namespace.

**Parameters**

1. [`namespace`] \( _string_ ): The namespace to default to.
2. `action` ( _Action_ ): Action to default the namespace of.

**Returns**

( _Action_ ): A new Redux action with a `meta.namespace` property.

### getStateByFeatureAndAction()

Returns Redux state by feature and action namespace.

**Parameters**

1. `feature` ( _string_ ): Feature to retrieve the state by.
2. `action` ( _Action_ ): Redux action with a `meta.namespace` property.
3. `state` ( _Object_ ): Redux state.

**Returns**

( _any_ ): Redux state slice.

**Example**

```js
import { getStateByFeatureAndAction } from '@redux-tools/namespaces';

const state = {
	namespaces: {
		foo: { value: 'bar' },
	},
};

const action = {
	meta: {
		namespace: 'foo',
	},
};

getStateByFeatureAndAction('namespaces', action, state); // { value: 'bar' }
```

### getStateByAction()

Returns Redux state by action namespace.

**Parameters**

1. `action` ( _Action_ ): Redux action with a `meta.namespace` property.
2. `state` ( _Object_ ): Redux state.

**Returns**

( _any_ ): Redux state slice.

**Example**

```js
import { DEFAULT_FEATURE, getStateByAction } from '@redux-tools/namespaces';

const state = {
	[DEFAULT_FEATURE]: {
		foo: { value: 'bar' },
	},
};

const action = {
	meta: {
		namespace: 'foo',
	},
};

getStateByAction(action, state); // { value: 'bar' }
```

### getStateByFeatureAndNamespace()

Returns Redux state by feature and namespace.

**Parameters**

1. `feature` ( _string_ ): Feature to retrieve the state by.
2. `namespace` ( _string_ ): Namespace to retrieve the state by.
3. `state` ( _Object_ ): Redux state.

**Returns**

( _any_ ): Redux state slice.

**Example**

```js
import { getStateByFeatureNamespace } from '@redux-tools/namespaces';

const state = {
	namespaces: {
		foo: { value: 'bar' },
	},
};

getStateByFeatureNamespace('namespaces', 'foo', state); // { value: 'bar' }
```

### getStateByNamespace()

Returns Redux state by namespace.

**Parameters**

1. `namespace` ( _string_ ): Namespace to retrieve the state by.
2. `state` ( _Object_ ): Redux state.

**Returns**

( _any_ ): Redux state slice.

**Example**

```js
import { DEFAULT_FEATURE, getStateByNamespace } from '@redux-tools/namespaces';

const state = {
	[DEFAULT_FEATURE]: {
		foo: { value: 'bar' },
	},
};

getStateByNamespace('foo', state); // { value: 'bar' }
```

### preventNamespace()

Associates an action with a "global" namespace, ensuring that this action's namespace won't be overwritten by any namespaced injectables.

**Parameters**

1. `action` ( _Action_ ): Action to prevent the namespace of.

**Returns**

( _Action_ ): A new Redux action with a `meta.namespace` property.
