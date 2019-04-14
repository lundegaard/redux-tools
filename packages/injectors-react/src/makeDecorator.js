import React from 'react';
import PropTypes from 'prop-types';
import { toPascalCase } from 'ramda-extension';
import { getDisplayName } from '@redux-tools/utils';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import makeHook from './makeHook';
import useInjectorContext from './useInjectorContext';

const makeDecorator = (configuration = {}) => {
	const useInjectables = makeHook(configuration);
	const { type } = configuration;
	const decoratorName = type ? `With${toPascalCase(type)}` : 'Injector';

	return (injectables, options = {}) => NextComponent => {
		const Injector = ({ feature: featureProp, namespace: namespaceProp, ...otherProps }) => {
			const feature = options.feature || featureProp || DEFAULT_FEATURE;
			const injectorContext = useInjectorContext(feature);
			const namespace = options.namespace || namespaceProp || injectorContext.namespace;
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
