import hoistNonReactStatics from 'hoist-non-react-statics';
import { curry } from 'ramda';
import { isFunction } from 'ramda-extension';
import React from 'react';

import getDisplayName from './getDisplayName';

const withProps = curry((otherProps, NextComponent) => {
	const WithProps = props => (
		<NextComponent {...props} {...(isFunction(otherProps) ? otherProps(props) : otherProps)} />
	);

	hoistNonReactStatics(WithProps, NextComponent);

	WithProps.displayName = `WithProps(${getDisplayName(NextComponent)})`;

	return WithProps;
});

export default withProps;
