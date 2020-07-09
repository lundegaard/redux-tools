import hoistNonReactStatics from 'hoist-non-react-statics';
import { mergeLeft } from 'ramda';
import React from 'react';

import { getDisplayName } from '@redux-tools/utils-react';

import NamespaceProvider from './NamespaceProvider';

const withNamespaceProvider = options => NextComponent => {
	const WithNamespaceProvider = props => (
		// NOTE: `NamespaceProvider` will ignore any unknown props.
		<NamespaceProvider {...mergeLeft(options, props)}>
			<NextComponent {...props} />
		</NamespaceProvider>
	);

	hoistNonReactStatics(WithNamespaceProvider, NextComponent);

	WithNamespaceProvider.displayName = `WithNamespaceProvider(${getDisplayName(NextComponent)})`;

	return WithNamespaceProvider;
};

export default withNamespaceProvider;
