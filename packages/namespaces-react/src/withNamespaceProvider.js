import { mergeLeft } from 'ramda';
import React from 'react';

import NamespaceProvider from './NamespaceProvider';

const withNamespaceProvider = optionProps => WrappedComponent => ({
	feature,
	namespace,
	store,
	useNamespace,
	children,
	...otherProps
}) => (
	<NamespaceProvider {...mergeLeft(optionProps, { feature, namespace, store, useNamespace })}>
		<WrappedComponent {...otherProps}>{children}</WrappedComponent>
	</NamespaceProvider>
);

export default withNamespaceProvider;
