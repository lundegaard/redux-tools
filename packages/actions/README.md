# @redux-tools/actions

An alternative to `redux-actions`, implemented using Ramda. Is is essentially a collection of utility functions for creating [FSA-compliant](https://github.com/redux-utilities/flux-standard-action) action creators and reducers.

## Usage

```js
import {
	makeConstantActionCreator,
	makeSimpleActionCreator,
	makeActionCreator,
	makeReducer,
} from '@redux-tools/actions';
import { prefixedValueMirror } from '@redux-tools/utils';
import { multiply } from 'ramda';
import { alwaysNull } from 'ramda-extension';

export const ActionTypes = prefixedValueMirror('duck', ['INCREMENT', 'ADD', 'CRAZY_ADD']);

export const increment = makeConstantActionCreator(ActionTypes.INCREMENT);
export const add = makeSimpleActionCreator(ActionTypes.ADD);
export const crazyAdd = makeActionCreator(ActionTypes.CRAZY_ADD, multiply(2), alwaysNull);

export default makeReducer(
	[
		[ActionTypes.INCREMENT, count => count + 1],
		[ActionTypes.ADD, (count, action) => count + action.payload],
		[ActionTypes.CRAZY_ADD, (count, action) => count + action.payload / 2],
	],
	0
);
```

## API Reference

### `makeActionCreator`

Creates a new unary action creator which will apply the provided functions to an argument, producing the `payload` and `meta` properties.

#### Arguments

1. `type` (_string_): The action type.
2. `getPayload` (_any –> any_): Payload getter.
3. `getMeta` (_any -> any_): Meta getter.

#### Returns

(_any -> Action_): An action creator.

### `makeSimpleActionCreator`

Creates a new unary action creator which will use the argument as the payload.

#### Arguments

1. `type` (_string_): The action type.

#### Returns

(_any -> Action_): An action creator.

### `makeConstantActionCreator`

Creates a new nullary action creator.

#### Arguments

1. `type` (_string_): The action type.

#### Returns

(_() -> Action_): An action creator.

### `makeReducer`

Creates a complex reducer from (type, reducer[, errorReducer]) tuples, akin to using the `switch` statement. Note that you needn't pass the default behavior.

#### Arguments

1. `tuples` (_\[\[string, Reducer, ?Reducer]]_): Tuples to combine into a reducer. The third tuple reducer is required only if you plan to pass errors (`instanceof Error`) into them, otherwise you can omit it.
2. `initialState` (_any_): Initial state for the reducer.

#### Returns

(_Reducer_): A new reducer.
