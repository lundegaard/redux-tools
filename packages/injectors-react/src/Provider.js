import React, { Component } from 'react';
import { mergeWith, or, flip } from 'ramda';
import PropTypes from 'prop-types';
import { Provider as StoreProvider } from 'react-redux';

import { InjectorContext } from './contexts';

const mergeContextValues = mergeWith(flip(or));

class Provider extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		namespace: PropTypes.string,
		store: PropTypes.object,
		withNamespace: PropTypes.func,
	};

	static contextType = InjectorContext;

	constructor(...args) {
		super(...args);
		const { namespace, store, withNamespace } = this.props;

		// TODO: Handle changes in props and context values.
		this.state = mergeContextValues(this.context, {
			namespace,
			store,
			withNamespace,
		});
	}

	render() {
		const { children } = this.props;
		const { store } = this.state;

		const providerElement = (
			<InjectorContext.Provider value={this.state}>{children}</InjectorContext.Provider>
		);

		return store ? <StoreProvider store={store}>{providerElement}</StoreProvider> : providerElement;
	}
}

export default Provider;
