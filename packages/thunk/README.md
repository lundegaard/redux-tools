# @redux-tools/thunk

[Redux Thunk](https://github.com/reduxjs/redux-thunk) clone, but passes the namespace (e.g. from `namespacedConnect`) down to all dispatched actions from within the thunk. No injections are going on here, because it doesn't make sense.

Also, make sure to inject this middleware before any other middleware. It's likely that stuff will break otherwise.

## API

Same as of Redux Thunk, with two exceptions:

- Instead of `dispatch, getState`, the thunk receives `{ dispatch, getState, getNamespacedState, namespace }` as a single argument.
- Instead of `withExtraArgument`, you can use `withDependencies` with an object, which is spread into the aforementioned single argument.
