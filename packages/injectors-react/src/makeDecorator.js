import hoistNonReactStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import { toPascalCase, isObject } from 'ramda-extension';
import React from 'react';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { useNamespace } from '@redux-tools/namespaces-react';
import { getDisplayName } from '@redux-tools/utils-react';

const makeDecorator = (storeInterface, useInjectables) => {
	invariant(isObject(storeInterface), 'The store interface is undefined.');

	const { type } = storeInterface;
	const decoratorName = type ? `With${toPascalCase(type)}` : 'Injector';

	return (injectables, options = {}) => NextComponent => {
		const Injector = ({ feature: propFeature, namespace: propNamespace, ...otherProps }) => {
			const feature = options.feature || propFeature || DEFAULT_FEATURE;
			const contextNamespace = useNamespace(feature);
			const namespace = options.namespace || propNamespace || contextNamespace;
			const isInitialized = useInjectables(injectables, { ...options, feature, namespace });

			if (isInitialized) {
				return (
					<NextComponent
						feature={feature}
						key={String([feature, namespace])}
						namespace={namespace}
						{...otherProps}
					/>
				);
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
