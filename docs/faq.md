# FAQ

This FAQ provides reasons for using @redux-tools and explains some of the decisions that we've made during development.

## What's the use case?

@redux-tools are a good choice if you answer "Yes!" to any of these questions.

- Do you want to isolate the Redux state of our widgets while still allowing them to communicate with one another?
- Do you want to associate your reducers and epics with your widget, so that they're injected and ejected when needed?
- Do your selectors include a lot of boilerplate code for accessing widget state?
  - For example, you may want to replace `state => state.widgets.a.something` with `state => state.something`.

@redux-tools aim to solve all of these issues automatically, yet transparently.

## Why not use something like redux-subspace and redux-dynostore?

We think that our implementation is simpler, more transparent and more fit for our use case, especially regarding integration with CMSs.

## How to use @redux-tools with React-union?

1. Replace the react-redux `<Provider />` with one from `@redux-tools`.
2. Pass `() => useContext(WidgetContext).namespace` as the `useNamespace` prop.

That's it! Now when you use e.g. `withReducers` or `namespacedConnect` in your widget, it will always access the correct namespace.

## Redux DevTools have stopped working for me. How do I fix them?

You might need to configure the DevTools slightly.

```js
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const composeEnhancers = composeWithDevTools({
	latency: 0,
	// NOTE: This might help in some versions of Redux DevTools.
	// shouldHotReload: false,
});
```

See the [API Documentation](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md) for more info.
