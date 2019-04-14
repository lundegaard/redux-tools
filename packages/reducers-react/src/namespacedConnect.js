import { compose, cond, apply, __, isNil, T, map, o } from 'ramda';
import { alwaysEmptyObject, isFunction, isObject } from 'ramda-extension';
import { getStateByNamespace } from '@redux-tools/reducers';
import { useInjectorContext } from '@redux-tools/injectors-react';
import { attachNamespace, DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { connect } from 'react-redux';
import { withProps } from '@redux-tools/utils-react';

export const wrapMapStateToProps = mapStateToProps => (state, ownProps) =>
	mapStateToProps
		? mapStateToProps(
				getStateByNamespace(ownProps.feature, ownProps.namespace, state),
				ownProps,
				state
		  )
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

const namespacedConnect = (
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
	{ feature: featureOption, namespace: namespaceOption, ...options } = {}
) =>
	o(
		withProps(({ feature: featureProp, namespace: namespaceProp }) => {
			const feature = featureOption || featureProp || DEFAULT_FEATURE;
			const { namespace: namespaceContext } = useInjectorContext(feature);

			return {
				feature,
				namespace: namespaceOption || namespaceProp || namespaceContext,
			};
		}),
		rawNamespacedConnect(mapStateToProps, mapDispatchToProps, mergeProps, options)
	);

export default namespacedConnect;
