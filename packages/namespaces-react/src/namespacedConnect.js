import { compose, cond, apply, __, isNil, T, map, o, dissoc } from 'ramda';
import { alwaysEmptyObject, isFunction, isObject } from 'ramda-extension';
import { connect } from 'react-redux';

import {
	defaultNamespace,
	DEFAULT_FEATURE,
	getStateByFeatureAndNamespace,
} from '@redux-tools/namespaces';
import { withProps, mapProps } from '@redux-tools/utils-react';

import useNamespace from './useNamespace';

export const NAMESPACED_CONNECT_PROPS = 'NAMESPACED_CONNECT_PROPS';

export const wrapMapStateToProps = mapStateToProps => (state, ownProps) =>
	mapStateToProps
		? mapStateToProps(
				getStateByFeatureAndNamespace(
					ownProps[NAMESPACED_CONNECT_PROPS].feature,
					ownProps[NAMESPACED_CONNECT_PROPS].namespace,
					state
				),
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
	const wrappedDispatch = o(
		dispatch,
		defaultNamespace(ownProps[NAMESPACED_CONNECT_PROPS].namespace)
	);

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
	compose(
		withProps(({ feature: propFeature, namespace: propNamespace }) => {
			const feature = optionFeature || propFeature || DEFAULT_FEATURE;
			const contextNamespace = useNamespace(feature);

			return {
				[NAMESPACED_CONNECT_PROPS]: {
					feature,
					namespace: optionNamespace || propNamespace || contextNamespace,
				},
			};
		}),
		rawNamespacedConnect(mapStateToProps, mapDispatchToProps, mergeProps, options),
		mapProps(dissoc(NAMESPACED_CONNECT_PROPS))
	);

export default namespacedConnect;
