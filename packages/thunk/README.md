# @redux-tools/thunk

[Redux Thunk](https://github.com/reduxjs/redux-thunk) clone, but passes the namespace (e.g. from `namespacedConnect`) down to all dispatched actions from within the thunk. No injections are going on here, because it doesn't make sense.

Also, make sure to inject this middleware before any other middleware. It's likely that stuff will break otherwise.
