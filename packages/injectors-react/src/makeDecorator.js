import React from 'react';
import { toPascalCase } from 'ramda-extension';
import { getDisplayName } from '@redux-tools/utils';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import makeHook from './makeHook';
import useInjectorContext from './useInjectorContext';

const makeDecorator = (configuration = {}) => {
	const useInjectables = makeHook(configuration);
	const { name } = configuration;
	const decoratorName = name ? `With${toPascalCase(name)}` : 'Injector';

	return (injectables, options = {}) => {
		const { feature = DEFAULT_FEATURE } = options;

		return NextComponent => {
			const Injector = props => {
				const { namespace } = useInjectorContext(feature);
				const isInitialized = useInjectables(injectables, options);

				if (isInitialized) {
					return <NextComponent key={String([feature, namespace])} {...props} />;
				}

				return null;
			};

			Injector.displayName = `${decoratorName}(${getDisplayName(NextComponent)})`;

			return Injector;
		};
	};
};

export default makeDecorator;
