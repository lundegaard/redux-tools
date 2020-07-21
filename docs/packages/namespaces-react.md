# Namespaces (React Bindings)

> yarn add @redux-tools/namespaces-react

This package provides React bindings for the [@redux-tools/namespaces](/packages/namespaces) package.

## API Reference

### \<NamespaceProvider />

Provides a namespacing strategy to its children. See the [tutorial](/tutorial/02-namespacing?id=namespace-provider) for more information about the usage.

**Props**

- [`useNamespace`] \( _Function_ ): A hook which returns the appropriate namespace based on React context.
- [`namespace`] \( _string_ ): A namespace to use for all nested components. Has priority over `useNamespace`.
- [`feature`] \( _string_ ): Feature to set the namespace for.

### namespacedConnect()

Works just like `connect()` from React Redux, except it always accesses namespaced state and automatically adds the correct namespace to dispatched actions. You can use the fourth `options` argument to configure the `namespace` and `feature` used.

Passes global state as the third argument to `mapStateToProps`.

See [React Redux docs](https://react-redux.js.org/docs/api) for more info.

### withNamespaceProvider()

A decorator that wraps a component in a namespace provider. Accepts the same props as `<NamespaceProvider />`. See the [multi-instance components tutorial](/tutorial/03-multi-instance-components) to learn more about the usage.

### useNamespacedDispatch()

Works just like `useDispatch` from React Redux, except it automatically adds the correct namespace to dispatched actions. Accepts an additional `options` parameter.

**Parameters**

1. [`options`] \( _Object_ ): Options for the hook.
   - [`options.feature`] \( _string_ ): Feature to retrieve the namespace from context by. Falls back to `DEFAULT_FEATURE`.
   - [`options.namespace`] \( _string_ ): Forced namespace. Falls back to namespace retrieved from React context.

### useNamespacedSelector()

Works just like `useSelector` from React Redux, except it always accesses namespaced state. Accepts an additional `options` parameter.

**Parameters**

1. `selector` ( _Function_ ): See [React Redux docs](https://react-redux.js.org/api/hooks#useselector) for more info.
2. [`equalityFn`] \( _Function_ ): See [React Redux docs](https://react-redux.js.org/api/hooks#useselector) for more info.
3. [`options`] \( _Object_ ): Options for the hook.
   - [`options.feature`] \( _string_ ): Feature to access the state of. Falls back to `DEFAULT_FEATURE`.
   - [`options.namespace`] \( _string_ ): Forced namespace. Falls back to namespace retrieved from React context.
