# @redux-tools/middleware

A Redux store enhancer for asynchronous injection of middleware.

## API Reference

### `makeEnhancer`

Function which creates an enhancer to pass to `createStore()`.

#### Arguments

This function accepts no arguments.

#### Returns

(_Enhancer_): A Redux store enhancer which you can pass to `createStore()`. This enhancer has a `injectedMiddleware` property, which you should `compose` with the enhancer via `applyMiddleware`.

#### Example

```js
import { createStore, applyMiddleware } from 'redux';
import { makeEnhancer as makeMiddlewareEnhancer } from '@redux-tools/middleware';
import { identity, compose } from 'ramda';

const middlewareEnhancer = makeMiddlewareEnhancer();
const { injectedMiddleware } = middlewareEnhancer;

const store = createStore(
	identity,
	compose(
		applyMiddleware(injectedMiddleware),
		middlewareEnhancer
	)
);
```

### `store.injectMiddleware`

This function will store passed middleware internally and replace the existing middleware with a fresh one.

#### Arguments

1. `middleware` (_Object_): Middleware to inject.
2. `options` (_Object_): Injection options. The following keys are supported:
   - [`namespace`] \(_string_): Namespace to inject the middleware under. If passed, the middleware will not handle actions from other namespaces.

### `store.ejectMiddleware`

Opposite to `store.injectMiddleware`. This function will remove the injected middleware. Make sure that you pass the correct namespace and middleware (keys AND values), otherwise the middleware will not be removed.

#### Arguments

1. `middleware` (_Object_): Middleware to eject. Make sure that both the keys and values match the injected ones!
2. `options` (_Object_): Ejection options. The following keys are supported:
   - [`namespace`] \(_string_): Namespace the middleware were injected under.
