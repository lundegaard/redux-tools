# Actions

> yarn add @redux-tools/actions

This package is a collection of utility functions for creating [FSA-compliant](https://github.com/redux-utilities/flux-standard-action) action creators and reducers.

## Best practices to follow

Only use `makeConstantActionCreator`, `makeSimpleActionCreator`, and `makeBinaryActionCreator` in your applications. Do not use any other action creator factories in your own code. Use the appropriate action creator factory based on the number of arguments the action creator should expect (i.e. `Constant` for zero, `Simple` for one, and `Binary` if any metadata can be passed).

The logic should be left to the reducer. Action creator usage should be transparent: whatever you pass to them ends up in the payload/meta. Use constant/simple/binary to determine how many arguments are expected by the action creator.

## Usage Example

```js
import {
	makeActionTypes,
	makeConstantActionCreator,
	makeSimpleActionCreator,
} from '@redux-tools/actions';

export const ActionTypes = makeActionTypes('@counter', ['ADD', 'INCREMENT']);

export const add = makeSimpleActionCreator(ActionTypes.ADD); // 1 arg.
export const increment = makeConstantActionCreator(ActionTypes.INCREMENT); // 0 args.
```

## API Reference

### makeActionTypes()

Creates an object with values set to `<prefix>/<type>`.

**Arguments**

1. `prefix` ( _string_ ): The action prefix.
2. `actionTypes` ( _Array_ ): Array of values to mirror as keys.

**Returns**

( _Object_ ): Object with values set to `<prefix>/<type>`.

### makeConstantActionCreator()

Creates a new nullary action creator.

**Arguments**

1. `type` ( _string_ ): The action type.

**Returns**

( _() -> Action_ ): An action creator.

### makeSimpleActionCreator()

Creates a new unary action creator which will use the argument as the payload.

**Arguments**

1. `type` ( _string_ ): The action type.

**Returns**

( _any -> Action_ ): An action creator.

### makeBinaryActionCreator()

Creates a new binary action creator which will use the argument as the payload.

**Arguments**

1. `type` ( _string_ ): The action type.

**Returns**

( _(any, Object) -> Action_ ): An action creator.

### makeActionCreator()

Creates a new unary action creator which will apply the provided functions to an argument, producing
the `payload` and `meta` properties.

**Arguments**

1. `type` ( _string_ ): The action type.
2. `getPayload` ( _any –> any_ ): Payload getter.
3. `getMeta` ( _any -> any_ ): Meta getter.

**Returns**

( _any -> Action_ ): An action creator.
