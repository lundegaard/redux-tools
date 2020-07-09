import { curry } from 'ramda';
import React from 'react';

import getDisplayName from './getDisplayName';

const mapProps = curry((getProps, NextComponent) => {
	const MapProps = props => <NextComponent {...getProps(props)} />;

	MapProps.displayName = `MapProps(${getDisplayName(NextComponent)})`;

	return MapProps;
});

export default mapProps;
