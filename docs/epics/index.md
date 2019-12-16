# Epics

> yarn add @redux-tools/epics

The package provides a Redux store enhancer for asynchronous injection and ejection of epics.

## Usage example


```js
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { makeEnhancer } from '@redux-tools/epics';
import { identity, compose } from 'ramda';
import { epicA, epicB } from './epics';

const epicMiddleware = createEpicMiddleware();

const store = createStore(
	identity,
	compose(
		makeEnhancer({ epicMiddleware }),
		applyMiddleware(epicMiddleware)
	)
);

store.injectEpics({
   epicA,
   epicB,
}, {
   namespace: 'someNamespaceA'
})
```

!> TODO: Rewrite usage without ramda + add some inject/eject examples

!> TODO: Example link

## API Reference

### makeEnhancer()

A function which creates an enhancer to pass to `createStore()`.

**Arguments**

1. `options` ( _Object_ ):
   - `epicMiddleware` ( _Middleware_ ): Return value of `createEpicMiddleware()`. Note that you must mount this middleware yourself (using the `applyMiddleware(epicMiddleware)` enhancer).
   - `streamCreator`\( _Function_ ): Stream creator, the return value of which will be passed as the 3rd argument to all injected epics.

**Returns**

(_Enhancer_): A Redux store enhancer which you can pass to `createStore()`.

#### store.injectEpics()

This function will store passed epics internally and start them if they're not running already.

**Arguments**

1. `epics` ( _Object_ ): Epics to inject.
2. `options` ( _Object_ ): Injection options. The following keys are supported:
   - `namespace` ( _string_ ): Namespace to inject the epic under. If passed, the epic will not handle actions from other namespaces and will always include the namespace in all returned actions
   - `feature` ( _string_ ):

#### store.ejectEpics()

Opposite to `store.injectEpics`. This function will stop the passed epics. Make sure that you pass the correct namespace and epics (keys and values), otherwise the epics will not be stopped.

**Arguments**

1. `epics` ( _Object_ ): Epics to eject. Make sure that both the keys and values match the injected ones!
2. `options` ( _Object_ ): Ejection options. The following keys are supported:
   - `namespace` ( _string_ ): Namespace the epics were injected under.
   - `feature` ( _string_ ):

### storeInterface()

Provides entries data of middleware. See [injectors](/injectors/index.md).
