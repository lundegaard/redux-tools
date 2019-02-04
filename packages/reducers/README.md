# @redux-tools/reducers

A Redux store enhancer for asynchronous injection of reducers.

## API Reference

### `enhancer`

Function which creates an enhancer to pass to `createStore()`.

#### Arguments

This function accepts no arguments.

#### Returns

(_Enhancer_): A Redux store enhancer which you can pass to `createStore()`.

#### Example

```js
import { createStore } from 'redux';
import { enhancer as injectableReducers } from '@redux-tools/reducers';
import { identity } from 'nanoutils';

const store = createStore(identity, injectableReducers());
```

### `store.injectReducers`

This function will store passed reducers internally and replace the existing reducer with a fresh one.

#### Arguments

1. `reducers` (_Object_): Reducers to inject.
2. [`namespace`] \(_string_): Namespace to inject the reducer under. If passed, the reducer will not handle actions from other namespaces and will store its state in `state.namespaces[namespace]` instead of in the root.
3. [`version`] \(_number_): Version of the reducers. You should not use this argument manually, as it is intended for handling React asynchronous rendering. See the [FAQ](../../FAQ.md) for more info.

### `store.ejectReducers`

Opposite to `store.injectReducers`. This function will remove the injected reducers. Make sure that you pass the correct namespace, version and epics (keys AND values), otherwise the reducers will not be removed.

#### Arguments

1. `reducers` (_Object_): Reducers to eject. Make sure that both the keys and values match the injected ones!
2. [`namespace`] \(_string_): Namespace the reducers were injected under.
3. [`version`] \(_number_): Version to eject. Any lower versions of the reducers will be ejected as well. See the [FAQ](../../FAQ.md) for more info.
