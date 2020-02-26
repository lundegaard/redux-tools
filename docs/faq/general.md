# FAQ: General {docsify-ignore-all}

## How to use Redux Tools with React Union?

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
