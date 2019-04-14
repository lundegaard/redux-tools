import { useContext } from 'react';
import { alwaysNull } from 'ramda-extension';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import { InjectorContext } from './contexts';

const useInjectorContext = feature => {
	const { namespaces = {}, store, useNamespace = alwaysNull } = useContext(InjectorContext);
	const namespace = useNamespace(feature || DEFAULT_FEATURE, namespaces);

	return {
		namespace: namespaces[feature] || namespace || namespaces[DEFAULT_FEATURE],
		namespaces,
		store,
		useNamespace,
	};
};

export default useInjectorContext;
