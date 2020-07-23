# Thunk (Extended)

> yarn add @redux-tools/thunk

A [Redux Thunk](https://github.com/reduxjs/redux-thunk) clone adapted for Redux Tools: it passes the namespace of a thunk dispatched via `namespacedConnect`'s `mapDispatchToProps` or `useNamespacedDispatch` down to all actions dispatched from within the thunk.

Make sure to inject this middleware before any other middleware.

## API Reference

Same as of Redux Thunk, with two exceptions:

- Instead of `dispatch, getState`, the thunk receives `{ dispatch, getState, getNamespacedState, namespace }` as a single argument.
- Instead of `withExtraArgument`, you can use `withDependencies` with an object, which is spread into the aforementioned single argument.
