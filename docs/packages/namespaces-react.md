# Namespaces (React Bindings)

> yarn add @redux-tools/namespaces-react

This package provides React bindings for the [@redux-tools/namespaces](/packages/namespaces) package.

## API Reference

### \<NamespaceProvider />

Provides a namespacing strategy to its children. See the [tutorial](/tutorial/02-namespacing?id=namespace-provider) for more information about the usage.

#### Props

- [`useNamespace`] \(_Function_): A hook which returns the appropriate namespace based on React context.
- [`namespace`] \(_string_): A namespace to use for all nested components. Has priority over `useNamespace`.
- [`feature`] \(_string_): Feature to set the namespace for.

### namespacedConnect()

Works just like `connect()` from React Redux, except it accesses namespaced state and automatically adds the correct namespace to dispatched actions. You can use the fourth `options` argument to configure the `namespace` and `feature` used.

Passes global state as the third argument to `mapStateToProps`.

See [react-redux docs](https://react-redux.js.org/docs/api) for more info.
