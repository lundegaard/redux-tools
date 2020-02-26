### \<Provider />

Provides a namespacing strategy to its children. See the [tutorial](/tutorial/02-namespacing?id=the-namespace-provider) for more information about the usage.

#### Props

- [`useNamespace`] \(_Function_): A hook which returns the appropriate namespace based on React context.
- [`namespace`] \(_string_): A namespace to use for all nested components. Has priority over `useNamespace`.
- [`feature`] \(_string_): Feature to set the namespace for.

This component is reexported from:

- [@redux-tools/reducers-react](/packages/reducers-react)
- [@redux-tools/epics-react](/packages/epics-react)
- [@redux-tools/middleware-react](/packages/middleware-react)

!> This component will likely be moved to `@redux-tools/namespaces-react` and renamed to `<NamespaceProvider />` in the near future.
