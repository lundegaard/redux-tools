# @redux-tools/injectors-react

Internal reusable logic for React injectors.

## API Reference

### `<Provider />`

_The same component is exported from `@redux-tools/reducers-react` and `@redux-tools/epics-react` as well._

The `<Provider />` React component makes the injection mechanism accessible to nested components. There are essentially three approaches to using this component:

1. If you do not need to handle namespacing at all.
   - Just use the component the same way you'd use react-redux's `<Provider />`.
2. If you are able to access the current namespace using React context from anywhere inside a widget and you are using a single virtual DOM for all widgets.
   - You can wrap the entire application in a single `<Provider withNamespace={withNamespace}>` component and you are done!
3. You are not using a single virtual DOM or you cannot reliably access the namespace from a nested component..
   - You should resort to wrapping each widget separately by using `<Provider namespace={namespace}>` instead.

This component is also a drop-in replacement for react-redux's `<Provider />`.

#### Props

- `store` (_Store_): The Redux store.
- [`withNamespace`] \(_Function_): A React component decorator (HOC) which will pass the correct namespace to a deeply nested component as the `namespace` prop.
- [`namespace`] \(_string_): A namespace to use for all nested components. Has priority over `withNamespace`.
