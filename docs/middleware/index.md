# Middleware

> yarn add @redux-tools/middleware

A package with redux store enhancer for asynchronous injection of middleware. It adds a possibility
to attach middleware with individual namespaces (and dispatch namespaced actions).

## Usage example

The snippet shows the most simple usage of the package. Several middleware are asynchronously
injected and called with dummy dispatch actions to show their behavior with namespaced
functionality. Note that:

- All middleware are called in the same order as they were injected.
- If we define action namespace the order persists, but middleware with different namespaces are.
ignored

```js
import {applyMiddleware, compose, createStore} from 'redux';
import {makeEnhancer as makeEnhancerMiddleware} from '@redux-tools/middleware';

/*
      // Redux middleware example
      const middlewareReduxX = store => next => action => {
      const actionModified = {...action, name};
      console.log('dispatching', actionModified);
      return next(actionModified);
   }
*/
import {middlewareReduxA, middlewareReduxB, middlewareReduxC} from './middleware';

const reducer = (state = {}) => state;

// Create enhancer & middleware for dynamic injections
const middlewareEnhancer = makeEnhancerMiddleware();
const {injectedMiddleware} = middlewareEnhancer;

const enhancers = compose(
   applyMiddleware(injectedMiddleware),
   middlewareEnhancer,
);

const store = createStore(reducer, enhancers);

store.injectMiddleware(middlewareReduxA);
store.dispatch({type: 'example'});
// dispatching {type: 'example', 'name': 'A'}

store.injectMiddleware(middlewareReduxB, {namespace: 'onlyB'});
store.dispatch({type: 'example'});
// Dispatching of global action - all middlewares are called
// dispatching {type: 'example', 'name': 'A'}
// dispatching {type: 'example', 'name': 'B'}

store.injectMiddleware(middlewareReduxC);
store.injectMiddleware(middlewareReduxD, {namespace: 'onlyD'});
store.dispatch({type: 'example', meta: {namespace: 'onlyD'}});
// Dispatching of action with "onlyD" namespace - all global and 'onlyD' middleware are called
// dispatching {type: 'example', 'name': 'A'}
// dispatching {type: 'example', 'name': 'C'}
// dispatching {type: 'example', 'name': 'D'}

// Make sure that middleware has the same reference as the injected one
store.ejectMiddleware(middlewareReduxA);
store.ejectMiddleware(middlewareReduxB, {namespace: 'onlyB'});

store.dispatch({type: 'example', meta: {namespace: 'onlyX'}});
// dispatching {type: 'example', 'name': 'C'}

```

!> TODO: Example link (`./examples/middleware-injection`)

## API Reference

### makeEnhancer()

A method for creating of redux enhancer (see an example above). Adds new methods to redux store:

#### store.injectMiddleware()

This function will store passed middleware internally and replace the existing middleware with a
fresh one.

**Arguments**

1. `middleware` ( _Object_ ): Middleware to inject
2. `options` ( _Object_ ): Injection options. The following keys are supported:
   - [`isGlobal`] ( _boolean_ ): Should be `true` if no namespace is provided
   - [`isPersistent`] ( _boolean_ ): Define whether middleware should be auto-ejected after unmount
   - [`namespace`] ( _string_ ): Namespace to inject the middleware under. If passed, the middleware
   will not handle actions from other namespaces.
   - [`feature`] ( _string_ ):

!> TODO: Feature description

#### store.ejectMiddleware()

Opposite to `store.injectMiddleware`. This function will remove the injected middleware. Make sure
that you pass the correct namespace and middleware (keys and values), otherwise the middleware will
not be removed.

**Arguments**

1. `middleware` ( _Object_ ): Middleware to eject. Make sure that both the keys and values match the
injected ones.
2. `options` ( _Object_ ): Ejection options. The following keys are supported:
   - [`isGlobal`] ( _boolean_ ): Should be `true` if no namespace is provided
   - [`isPersistent`] ( _boolean_ ): Define whether middleware should be auto-ejected after unmount
   - [`namespace`] ( _string_ ): Namespace the middleware were injected under.
   - [`feature`] ( _string_ ):
 
!> TODO: Feature description

### storeInterface()

Provides entries data of middleware. See [injectors](/injectors/index.md).
