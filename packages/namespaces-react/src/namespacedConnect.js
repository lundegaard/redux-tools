import { compose, cond, apply, __, isNil, T, map, o } from 'ramda';
import { alwaysEmptyObject, isFunction, isObject } from 'ramda-extension';
import { defaultNamespace, DEFAULT_FEATURE, getStateByNamespace } from '@redux-tools/namespaces';
import { connect } from 'react-redux';
import { withProps } from '@redux-tools/utils-react';

import useNamespace from './useNamespace';

export const wrapMapStateToProps = mapStateToProps => (state, ownProps) =>
	mapStateToProps
		? mapStateToProps(
				getStateByNamespace(ownProps.feature, ownProps.namespace, state),
				ownProps,
				state
		  )
		: {};

const wrapActionCreator = wrappedDispatch => actionCreator =>
	compose(wrappedDispatch, actionCreator);

const throwTypeError = () => {
	throw new TypeError('mapDispatchToProps is not an object or a function');
};

export const wrapMapDispatchToProps = mapDispatchToProps => (dispatch, ownProps) => {
	const wrappedDispatch = o(dispatch, defaultNamespace(ownProps.namespace));

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

const namespacedConnect = (
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
	{ feature: optionFeature, namespace: optionNamespace, ...options } = {}
) =>
	o(
		withProps(({ feature: propFeature, namespace: propNamespace }) => {
			const feature = optionFeature || propFeature || DEFAULT_FEATURE;
			const contextNamespace = useNamespace(feature);

			return {
				feature,
				namespace: optionNamespace || propNamespace || contextNamespace,
			};
		}),
		rawNamespacedConnect(mapStateToProps, mapDispatchToProps, mergeProps, options)
	);

export default namespacedConnect;
