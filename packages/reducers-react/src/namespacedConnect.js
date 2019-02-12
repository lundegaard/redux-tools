import React from 'react';
import { compose, o, cond, apply, __, isNil, T, map, omit } from 'ramda';
import { alwaysEmptyObject, isFunction, isObject } from 'ramda-extension';
import { getStateByNamespace } from '@redux-tools/reducers';
import { withInjectorContext } from '@redux-tools/injectors-react';
import { attachNamespace } from '@redux-tools/namespaces';
import { connect } from 'react-redux';

export const wrapMapStateToProps = mapStateToProps => (state, ownProps) =>
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

export const wrapMapDispatchToProps = mapDispatchToProps => (dispatch, ownProps) => {
	const wrappedDispatch = o(dispatch, attachNamespace(ownProps.namespace));

	return cond([
		[isNil, alwaysEmptyObject],
		[isFunction, apply(__, [wrappedDispatch, ownProps])],
		[isObject, map(wrapActionCreator(wrappedDispatch))],
		[T, throwTypeError],
	])(mapDispatchToProps);
};

const rawNamespacedConnect = (mapStateToProps, mapDispatchToProps, ...args) =>
	connect(
		wrapMapStateToProps(mapStateToProps),
		wrapMapDispatchToProps(mapDispatchToProps),
		...args
	);

const omitStore = omit(['store']);

// eslint-disable-next-line react/display-name
const withOmitStore = Component => props => <Component {...omitStore(props)} />;

const namespacedConnect = (
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
	{ feature, ...options } = {}
) =>
	compose(
		withInjectorContext({ feature }),
		withOmitStore,
		rawNamespacedConnect(mapStateToProps, mapDispatchToProps, mergeProps, options)
	);

export default namespacedConnect;
