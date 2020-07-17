import hoistNonReactStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import { toPascalCase, isObject } from 'ramda-extension';
import React from 'react';

import { useNamespace } from '@redux-tools/namespaces-react';
import { getDisplayName } from '@redux-tools/utils-react';

const makeDecorator = (storeInterface, useInjectables) => {
	invariant(isObject(storeInterface), 'The store interface is undefined.');

	const { type } = storeInterface;
	const decoratorName = type ? `With${toPascalCase(type)}` : 'Injector';

	return (injectables, options = {}) => NextComponent => {
		const Injector = props => {
			// eslint-disable-next-line react/destructuring-assignment
			const feature = options.feature ?? props.feature ?? null;
			const contextNamespace = useNamespace(feature);
			// eslint-disable-next-line react/destructuring-assignment
			const namespace = options.namespace ?? props.namespace ?? contextNamespace ?? null;
			const isInitialized = useInjectables(injectables, { ...options, feature, namespace });

			if (isInitialized) {
				return <NextComponent key={String([feature, namespace])} {...props} />;
			}

			return null;
		};

		Injector.propTypes = {
			feature: PropTypes.string,
			namespace: PropTypes.string,
		};

		hoistNonReactStatics(Injector, NextComponent);

		Injector.displayName = `${decoratorName}(${getDisplayName(NextComponent)})`;

		return Injector;
	};
};

export default makeDecorator;
