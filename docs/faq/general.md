# FAQ: General {docsify-ignore-all}

## How to use Redux Tools with React Union?

1. Wrap your `<Union />` component in a `<NamespaceProvider />`.
2. Pass `() => useContext(WidgetContext).namespace` as the `useNamespace` prop to the namespace provider.

That's it! All injector decorators, `namespacedConnect`, and namespaced hooks will always access the namespace of the widget they are being used in.

To use injectors globally, pass `isGlobal: true` to them. To access global state and affect global state, use the decorators and hooks from React Redux directly.

## Redux DevTools have stopped working for me. How do I fix them?

You might need to configure the DevTools slightly.

```js
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

const composeEnhancers = composeWithDevTools({
	latency: 0,
});
```

If you're having issues with infinite loops outside production environments, passing `shouldHotReload: false` might help you get around this issue.

> `store.replaceReducer` will otherwise cause all prior actions to be redispatched to the new reducer, updating the state. This might cause a rerender of some of your components. However, if you are creating components dynamically without proper memoization, they will be completely remounted. Whenever a Redux Tools decorator is remounted, the injectables are reinjected accordingly. This will cause another `store.replaceReducer` call and an infinite loop.

See the [API Documentation](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md) for more info.
