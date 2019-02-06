# @redux-tools/middleware

A Redux store enhancer for asynchronous injection of middleware.

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
import { enhancer as injectableMiddleware } from '@redux-tools/middleware';
import { identity } from 'ramda';

const store = createStore(identity, injectableMiddleware());
```

### `store.injectMiddleware`

This function will store passed middleware internally and replace the existing middleware with a fresh one.

#### Arguments

1. `middleware` (_Object_): Middleware to inject.
2. [`namespace`] \(_string_): Namespace to inject the middleware under. If passed, the middleware will not handle actions from other namespaces.
3. [`version`] \(_number_): Version of the middleware. You should not use this argument manually, as it is intended for handling React asynchronous rendering. See the [FAQ](../../FAQ.md) for more info.

### `store.ejectMiddleware`

Opposite to `store.injectMiddleware`. This function will remove the injected middleware. Make sure that you pass the correct namespace, version and epics (keys AND values), otherwise the middleware will not be removed.

#### Arguments

1. `middleware` (_Object_): Middleware to eject. Make sure that both the keys and values match the injected ones!
2. [`namespace`] \(_string_): Namespace the middleware were injected under.
3. [`version`] \(_number_): Version to eject. Any lower versions of the middleware will be ejected as well. See the [FAQ](../../FAQ.md) for more info.
