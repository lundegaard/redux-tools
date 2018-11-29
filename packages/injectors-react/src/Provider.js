import React from 'react';
import { mergeWith, or, flip } from 'ramda';
import PropTypes from 'prop-types';
import { Provider as StoreProvider } from 'react-redux';

import { InjectorContext } from './contexts';

const mergeContextValues = mergeWith(flip(or));

const Provider = ({ children, namespace, store, withNamespace }) => (
	<InjectorContext.Consumer>
		{value => {
			const resolvedValue = mergeContextValues(value, { namespace, store, withNamespace });

			const providerElement = (
				<InjectorContext.Provider value={resolvedValue}>{children}</InjectorContext.Provider>
			);

			return resolvedValue.store ? (
				<StoreProvider store={resolvedValue.store}>{providerElement}</StoreProvider>
			) : (
				providerElement
			);
		}}
	</InjectorContext.Consumer>
);

Provider.propTypes = {
	children: PropTypes.node.isRequired,
	namespace: PropTypes.string,
	store: PropTypes.object,
	withNamespace: PropTypes.func,
};

export default Provider;
