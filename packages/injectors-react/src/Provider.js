import React, { Component } from 'react';
import { mergeDeepWith, or, flip } from 'ramda';
import PropTypes from 'prop-types';
import { Provider as StoreProvider } from 'react-redux';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import { InjectorContext } from './contexts';

const mergeContextValues = mergeDeepWith(flip(or));

class Provider extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		feature: PropTypes.string,
		getNamespace: PropTypes.func,
		namespace: PropTypes.string,
		store: PropTypes.object,
		withNamespace: PropTypes.func,
	};

	static defaultProps = {
		feature: DEFAULT_FEATURE,
	};

	static contextType = InjectorContext;

	constructor(...args) {
		super(...args);
		const { feature, getNamespace, namespace, store, withNamespace } = this.props;
		const { features } = this.context;

		// TODO: Handle changes in props and context values.
		this.state = mergeContextValues(this.context, {
			features: { [feature]: getNamespace ? getNamespace(features) : namespace },
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
