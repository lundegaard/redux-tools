# @redux-tools/epics

A Redux store enhancer for asynchronous injection of epics.

## API Reference

### `enhancer`

Function which creates an enhancer to pass to `createStore()`.

#### Arguments

1. `options` (_Object_):
   - `epicMiddleware` (_Middleware_): Return value of `createEpicMiddleware()`. Note that you must mount this middleware yourself (using the `applyMiddleware(epicMiddleware)` enhancer).
   - [`streamCreator`] \(_Function_): Stream creator, the return value of which will be passed as the 3rd argument to all injected epics.

#### Returns

(_Enhancer_): A Redux store enhancer which you can pass to `createStore()`.

#### Example

```js
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { enhancer as injectableEpics } from '@redux-tools/epics';
import { identity, compose } from 'ramda';

const epicMiddleware = createEpicMiddleware();
const store = createStore(
	identity,
	compose(
		injectableEpics({ epicMiddleware }),
		applyMiddleware(epicMiddleware)
	)
);
```

### `store.injectEpics`

This function will store passed epics internally and start them if they're not running already.

#### Arguments

1. `epics` (_Object_): Epics to inject.
2. `options` (_Object_): Injection options. The following keys are supported:
   - [`namespace`] \(_string_): Namespace to inject the epic under. If passed, the epic will not handle actions from other namespaces and will always include the namespace in all returned actions.
   - [`version`] \(_number_): Version of the epics. You should not use this argument manually, as it is intended for handling React asynchronous rendering. See the [FAQ](../../FAQ.md) for more info.

### `store.ejectEpics`

Opposite to `store.injectEpics`. This function will stop the passed epics. Make sure that you pass the correct namespace, version and epics (keys AND values), otherwise the epics will not be stopped.

#### Arguments

1. `epics` (_Object_): Epics to eject. Make sure that both the keys and values match the injected ones!
2. `options` (_Object_): Ejection options. The following keys are supported:
   - [`namespace`] \(_string_): Namespace the epics were injected under.
   - [`version`] \(_number_): Version to eject. Any lower versions of the epics will be ejected as well. See the [FAQ](../../FAQ.md) for more info.
