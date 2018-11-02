import React from 'react';
import { identity } from 'ramda';

import { InjectorContext } from './contexts';

export default function withInjectorContext(NextComponent) {
	// NOTE: to prevent unnecessary remounting of the component
	let WrappedComponent = null;

	const WithInjectorContext = props => (
		<InjectorContext.Consumer>
			{({ withNamespace = identity, store }) => {
				if (!WrappedComponent) {
					WrappedComponent = withNamespace(NextComponent);
				}

				return <WrappedComponent store={store} {...props} />;
			}}
		</InjectorContext.Consumer>
	);

	return WithInjectorContext;
}
