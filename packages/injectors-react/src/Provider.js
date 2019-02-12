import React, { Component } from 'react';
import { mergeDeepWith, or, flip } from 'ramda';
import PropTypes from 'prop-types';
import { Provider as StoreProvider } from 'react-redux';

import { InjectorContext } from './contexts';

const mergeContextValues = mergeDeepWith(flip(or));

class Provider extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		feature: PropTypes.string,
		namespace: PropTypes.string,
		store: PropTypes.object,
		withNamespace: PropTypes.func,
	};

	static defaultProps = {
		feature: 'namespaces',
	};

	static contextType = InjectorContext;

	constructor(...args) {
		super(...args);
		const { feature, namespace, store, withNamespace } = this.props;

		// TODO: Handle changes in props and context values.
		this.state = mergeContextValues(this.context, {
			features: { [feature]: namespace },
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
