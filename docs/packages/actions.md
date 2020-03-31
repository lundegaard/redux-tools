# Actions

> yarn add @redux-tools/actions

This package is a collection of utility functions for creating [FSA-compliant](https://github.com/redux-utilities/flux-standard-action) action creators and reducers.

## Best Practices

Only use `makeEmptyActionCreator`, `makePayloadActionCreator`, and `makePayloadMetaActionCreator` in your applications. Do not use any other action creator factories in your own code. Use the appropriate action creator factory based on the number of arguments the action creator should expect (i.e. `Empty` for zero, `Payload` for one, and `PayloadMeta` if any metadata can be passed).

Reasoning: any custom logic should be left to the reducer; action creator usage should be transparent. You should be able to rely on your action creators to always use the arguments you pass as `action.payload` or `action.meta` directly.

## Usage Example

```js
import {
	makeActionTypes,
	makeEmptyActionCreator,
	makePayloadActionCreator,
} from '@redux-tools/actions';

export const ActionTypes = makeActionTypes('@counter', ['ADD', 'INCREMENT']);

export const add = makePayloadActionCreator(ActionTypes.ADD); // 1 arg.
export const increment = makeEmptyActionCreator(ActionTypes.INCREMENT); // 0 args.
```

## API Reference

### makeActionTypes()

Creates an object with values set to `<prefix>/<type>`.

**Arguments**

1. `prefix` ( _string_ ): The action prefix.
2. `actionTypes` ( _Array_ ): Array of values to mirror as keys.

**Returns**

( _Object_ ): Object with values set to `<prefix>/<type>`.

### makeEmptyActionCreator()

Creates a new nullary action creator.

**Arguments**

1. `type` ( _string_ ): The action type.

**Returns**

( _() -> Action_ ): An action creator.

### makePayloadActionCreator()

Creates a new unary action creator which will use the argument as the payload.

**Arguments**

1. `type` ( _string_ ): The action type.

**Returns**

( _any -> Action_ ): An action creator.

### makePayloadMetaActionCreator()

Creates a new binary action creator which will use the first argument as the payload and the second argument as the meta.

**Arguments**

1. `type` ( _string_ ): The action type.

**Returns**

( _(any, Object) -> Action_ ): An action creator.

### configureActionCreator()

!> This action creator factory is only meant to be used to create other action creator factories. We do not recommend using makeActionCreator in your application code.
!>

Creates a new unary action creator which will apply the provided functions to an argument, producing
the `payload` and `meta` properties.

**Arguments**

1. `type` ( _string_ ): The action type.
2. `getPayload` ( _any –> any_ ): Payload getter.
3. `getMeta` ( _any -> any_ ): Meta getter.

**Returns**

( _any -> Action_ ): An action creator.
