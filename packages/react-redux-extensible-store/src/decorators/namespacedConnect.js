import { o, mergeDeepRight, binary, compose, map, useWith } from 'ramda';
import { isFunction, isObject } from 'ramda-extension';
import { withWidgetContext } from 'react-union';
import { connect } from 'react-redux';

import { getStateByNamespace } from '@lnd/redux-extensible-store';

export const makeMapStateToProps = mapStateToProps => (state, ownProps) => {
	if (!mapStateToProps) {
		return {};
	}

	return mapStateToProps(getStateByNamespace(ownProps.namespace, state), ownProps, state);
};

export const makeMapDispatchToProps = mapDispatchToProps => (dispatch, ownProps) => {
	if (!mapDispatchToProps) {
		return {};
	}

	const wrappedDispatch = o(dispatch, mergeDeepRight({ meta: { namespace: ownProps.namespace } }));

	if (isFunction(mapDispatchToProps)) {
		return mapDispatchToProps(wrappedDispatch, ownProps);
	}

	if (isObject(mapDispatchToProps)) {
		const wrapActionCreator = actionCreator =>
			compose(
				wrappedDispatch,
				actionCreator
			);

		return map(wrapActionCreator, mapDispatchToProps);
	}

	throw new TypeError('mapDispatchToProps is not an object or a function');
};

const rawNamespacedConnect = binary(
	useWith(connect, [makeMapStateToProps, makeMapDispatchToProps])
);

export const namespacedConnect = (...args) => o(withWidgetContext, rawNamespacedConnect(...args));

export default namespacedConnect;
