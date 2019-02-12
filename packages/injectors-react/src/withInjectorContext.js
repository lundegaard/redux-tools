import React, { Component } from 'react';
import { identity } from 'ramda';
import { getDisplayName } from '@redux-tools/utils';

import { InjectorContext } from './contexts';

const withInjectorContext = ({ feature = 'namespaces' } = {}) => NextComponent =>
	class WithInjectorContext extends Component {
		static displayName = `WithInjectorContext(${getDisplayName(NextComponent)})`;

		WrappedComponent = null;

		render() {
			return (
				<InjectorContext.Consumer>
					{({ features = {}, store, withNamespace = identity }) => {
						// NOTE: React's reconciliation process would otherwise think that we're rendering
						// two different components (because we would be creating a new one each render).
						if (!this.WrappedComponent) {
							// TODO: Handle `withNamespace` changes.
							this.WrappedComponent = withNamespace(NextComponent);
						}

						return (
							<this.WrappedComponent
								store={store}
								{...(features[feature] ? { namespace: features[feature] } : {})}
								{...this.props}
							/>
						);
					}}
				</InjectorContext.Consumer>
			);
		}
	};

export default withInjectorContext;
