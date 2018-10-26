import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { keys, o } from 'ramda';
import { withWidgetContext } from 'react-union';
import { suffixKeys } from '@lnd/redux-extensible-store';
import { getDisplayName } from '@lnd/utils';
import { StoreContext } from '../contexts';

function withStoreContext(Component) {
	function WithStoreContext(props) {
		return <StoreContext.Consumer>{(store) => <Component {...props} store={store} />}</StoreContext.Consumer>;
	}

	WithStoreContext.displayName = `WithStoreContext(${getDisplayName(Component)})`;
	return WithStoreContext;
}

export default function withRedux({ epics, reducers, persistReducers, global: isGlobal }) {
	return (NextComponent) => {
		class WithRedux extends Component {
			constructor(props) {
				super(props);
				// NOTE: This is necessary because if a container is remounted for any reason,
				// the `componentWillUnmount` lifecycle hook is invoked AFTER the constructor of the new
				// element. This would cause the reducers to be removed and not injected back.
				//
				// `->` is constructor of the second instance and `=>` is CWU of the first one
				// BEFORE: [reducer] -> [reducer] => [], no reducer survives the remounting process
				// AFTER: [reducer1] -> [reducer1, reducer2] => [reducer2], the second reducer survives
				this.id = withRedux.counter++;

				this.suffixDependencies = suffixKeys(this.id);
				this.namespace = isGlobal ? undefined : props.namespace;

				this.props.store.injectReducers(this.getReducers(), this.namespace);
				this.props.store.injectEpics(this.getEpics(), this.namespace);
			}

			componentWillUnmount() {
				if (!persistReducers) {
					this.props.store.removeReducers(keys(this.getReducers()), this.namespace);
				}

				this.props.store.removeEpics(keys(this.getEpics()));
			}

			getReducers = () => this.suffixDependencies(reducers);

			getEpics = () => this.suffixDependencies(epics);

			render() {
				return <NextComponent {...this.props} />;
			}
		}

		WithRedux.propTypes = {
			namespace: PropTypes.string,
			store: PropTypes.object.isRequired,
		};

		WithRedux.displayName = `WithRedux(${getDisplayName(NextComponent)})`;

		return isGlobal ? withStoreContext(WithRedux) : o(withStoreContext, withWidgetContext)(WithRedux);
	};
}

withRedux.counter = 0;
