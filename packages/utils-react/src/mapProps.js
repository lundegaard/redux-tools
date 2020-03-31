import { curry } from 'ramda';
import { isFunction } from 'ramda-extension';
import React from 'react';

import getDisplayName from './getDisplayName';

const mapProps = curry((otherProps, NextComponent) => {
	const MapProps = props => (
		<NextComponent {...(isFunction(otherProps) ? otherProps(props) : otherProps)} />
	);

	MapProps.displayName = `MapProps(${getDisplayName(NextComponent)})`;

	return MapProps;
});

export default mapProps;
