### \<Provider />

See the [tutorial](/tutorial/02-namespacing?id=namespace-provider) for more information about the usage.

#### Props

- [`useNamespace`] \(_Function_): A hook which returns the appropriate namespace based on React context.
- [`namespace`] \(_string_): A namespace to use for all nested components. Has priority over `useNamespace`.
- [`feature`] \(_string_): Feature to set the namespace for.

Please note that the same component is reexported from:

- [@redux-tools/reducers-react](/packages/reducers-react)
- [@redux-tools/epics-react](/packages/epics-react)
- [@redux-tools/middleware-react](/packages/middleware-react)

!> This component will likely be moved to `@redux-tools/namespaces-react` and renamed to `<NamespaceProvider />` in the near future.
