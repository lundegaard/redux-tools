import { compose, o, cond, call, __, isNil, binary, useWith, T, mergeDeepRight, map } from 'ramda';
import { alwaysEmptyObject, isFunction, isObject } from 'ramda-extension';
import { getStateByNamespace } from '@redux-tools/reducers';
import { withInjectorContext } from '@redux-tools/injectors-react';
import { connect } from 'react-redux';

export const makeMapStateToProps = mapStateToProps => (state, ownProps) =>
	mapStateToProps
		? mapStateToProps(getStateByNamespace(ownProps.namespace, state), ownProps, state)
		: {};

const wrapActionCreator = wrappedDispatch => actionCreator =>
	compose(
		wrappedDispatch,
		actionCreator
	);

const throwTypeError = () => {
	throw new TypeError('mapDispatchToProps is not an object or a function');
};

export const makeMapDispatchToProps = mapDispatchToProps => (dispatch, ownProps) => {
	const wrappedDispatch = o(dispatch, mergeDeepRight({ meta: { namespace: ownProps.namespace } }));

	return cond([
		[isNil, alwaysEmptyObject],
		[isFunction, call(__, wrappedDispatch, ownProps)],
		[isObject, map(wrapActionCreator(wrappedDispatch))],
		[T, throwTypeError],
	])(mapDispatchToProps);
};

// NOTE: `binary()` allows calling the fn with 0-1 args as well (it supplies the remaining args)
const rawNamespacedConnect = binary(
	useWith(connect, [makeMapStateToProps, makeMapDispatchToProps])
);

const namespacedConnect = (...args) => o(withInjectorContext, rawNamespacedConnect(...args));

export default namespacedConnect;
