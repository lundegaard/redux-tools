# Namespaces

> yarn add @redux-tools/namespaces

This package provides the main logic for associating Redux actions with a namespace.

## API Reference

### isActionFromNamespace()

A function that checks if a Redux action is from a certain namespace. Returns `false` when both namespaces are defined and **not** equal, otherwise returns `true`.

There are essentially two edge cases:

- If the action has no namespace, it is a global action and therefore affects **all** namespaces.
- If the tested namespace is undefined, it is a global namespace and is therefore affected by **all** actions.
  - This allows easier usage of other packages (notably using `namespacedConnect` for dispatching
    actions affecting global reducers and epics, instead of having to use `connect` separately).
    Note that this behavior may be changed in future versions.

**Arguments**

1. `action` ( _Action_ ): The Redux action to check. Should have a `meta.namespace` property.
2. [`namespace`] ( _string_ ): The namespace to check against.

**Returns**

( _boolean_ ): Whether the Redux action is from the specified namespace.

### getNamespaceByAction()

Returns the namespace of an action.

**Arguments**

1. `action` ( _Action_ ): The Redux action to get the namespace of. Should have a `meta.namespace` property

**Returns**

( _any_ ): The value of the `meta.namespace` property

### attachNamespace()

Associates an action with a namespace, overwriting any previous namespace.

**Arguments**

1. [`namespace`] ( _string_ ): The namespace to attach
2. `action` ( _Action_ ): Action to attach the namespace to

**Returns**

( _Action_ ): A new Redux action with a `meta.namespace` property

### defaultNamespace()

Associates an action with a namespace unless it is already associated with some namespace.

**Arguments**

1. [`namespace`] ( _string_ ): The namespace to default to
2. `action` ( _Action_ ): Action to default the namespace of

**Returns**

( _Action_ ): A new Redux action with a `meta.namespace` property

### DEFAULT_FEATURE

A _string_ constant with default feature name (namespace group).  
