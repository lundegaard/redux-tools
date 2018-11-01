import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import PropTypes from 'prop-types';

import { StoreContext } from '../contexts';

const Provider = ({ store, ...otherProps }) => (
	<StoreContext.Provider value={store}>
		<ReduxProvider store={store} {...otherProps} />
	</StoreContext.Provider>
);

Provider.propTypes = {
	store: PropTypes.object.isRequired,
};

export default Provider;
