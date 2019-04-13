import React, { useContext, useMemo } from 'react';
import { mergeDeepWith, flip, or } from 'ramda';
import PropTypes from 'prop-types';
import { Provider as StoreProvider } from 'react-redux';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import { InjectorContext } from './contexts';

// NOTE: `flip(or)` gives priority to second argument.
const mergeContextValues = mergeDeepWith(flip(or));

const Provider = ({ children, feature, namespace, store, useNamespace }) => {
	const injectorContext = useContext(InjectorContext);

	const contextValues = useMemo(
		() =>
			mergeContextValues(injectorContext, {
				// NOTE: Defaulting here is safer than using `Provider.defaultProps`,
				// because passing `null` would not result in a fallback to `DEFAULT_FEATURE`.
				namespaces: { [feature || DEFAULT_FEATURE]: namespace },
				store,
				useNamespace,
			}),
		[feature, injectorContext, namespace, store, useNamespace]
	);

	const providerElement = (
		<InjectorContext.Provider value={contextValues}>{children}</InjectorContext.Provider>
	);

	return store ? <StoreProvider store={store}>{providerElement}</StoreProvider> : providerElement;
};

Provider.propTypes = {
	children: PropTypes.node.isRequired,
	feature: PropTypes.string,
	namespace: PropTypes.string,
	store: PropTypes.object,
	useNamespace: PropTypes.func,
};

export default Provider;
