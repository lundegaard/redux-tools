# Middleware

> yarn add @redux-tools/middleware

This package provides a store enhancer for injecting middleware into a Redux store after the store is created.

## Usage Example

```js
import { applyMiddleware, compose, createStore } from 'redux';
import { makeEnhancer as makeEnhancerMiddleware } from '@redux-tools/middleware';

const someMiddleware = () => next => action =>
	next({
		...action,
		type: `${action.type}_MODIFIED`,
	});

// Create enhancer & middleware for dynamic injections
const middlewareEnhancer = makeEnhancerMiddleware();
const { injectedMiddleware } = middlewareEnhancer;

const enhancers = compose(applyMiddleware(injectedMiddleware), middlewareEnhancer);

const store = createStore(state => state, enhancers);

store.injectMiddleware(someMiddleware);
store.dispatch({ type: 'EXAMPLE' }); // Reducer receives `EXAMPLE_MODIFIED` under the hood.
```

## API Reference

### makeEnhancer()

A function which creates an enhancer to pass to `createStore()`.

#### store.injectMiddleware()

This function will store passed middleware internally and replace the existing middleware with a fresh one.

**Arguments**

1. `middleware` ( _Object_ ): Middleware to inject
2. `options` ( _Object_ ): Injection options. The following keys are supported:
   - [`namespace`] \( _string_ ): Namespace to inject the middleware under. If passed, the middleware will not handle actions from other namespaces.
   - [`feature`] \( _string_ ): Feature to resolve the namespace by (if using namespace providers).

#### store.ejectMiddleware()

Opposite to `store.injectMiddleware`. This function will remove the injected middleware. Make sure that you pass the correct namespace and middleware (keys and values), otherwise the middleware will not be removed.

**Arguments**

1. `middleware` ( _Object_ ): Middleware to eject. Make sure that both the keys and values match the injected ones.
2. `options` ( _Object_ ): Ejection options. The following keys are supported:
   - [`namespace`] \( _string_ ): Namespace the middleware were injected under.
   - [`feature`] \( _string_ ): Feature the middleware were injected under.
