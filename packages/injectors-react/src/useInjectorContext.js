import { useContext } from 'react';
import { alwaysNull } from 'ramda-extension';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import { InjectorContext } from './contexts';

const useInjectorContext = (feature = DEFAULT_FEATURE) => {
	const { namespaces = {}, store, useNamespace = alwaysNull } = useContext(InjectorContext);
	const namespace = useNamespace(feature, namespaces);

	return {
		namespace: namespaces[feature] || namespace || namespaces[DEFAULT_FEATURE],
		namespaces,
		store,
		useNamespace,
	};
};

export default useInjectorContext;
