import React, { Component } from 'react';
import { identity } from 'nanoutils';
import { getDisplayName } from '@redux-tools/utils';

import { InjectorContext } from './contexts';

export default function withInjectorContext(NextComponent) {
	return class WithInjectorContext extends Component {
		static displayName = `WithInjectorContext(${getDisplayName(NextComponent)})`;

		WrappedComponent = null;

		render() {
			return (
				<InjectorContext.Consumer>
					{({ namespace, store, withNamespace = identity }) => {
						// NOTE: React's reconciliation process would otherwise think that we're rendering
						// two different components (because we would be creating a new one each render).
						if (!this.WrappedComponent) {
							// TODO: Handle `withNamespace` changes.
							this.WrappedComponent = withNamespace(NextComponent);
						}

						return (
							<this.WrappedComponent
								store={store}
								{...(namespace ? { namespace } : {})}
								{...this.props}
							/>
						);
					}}
				</InjectorContext.Consumer>
			);
		}
	};
}
