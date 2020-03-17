import { useContext } from 'react';
import { alwaysNull } from 'ramda-extension';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import { NamespaceContext } from './contexts';

const useNamespace = feature => {
	const { namespaces = {}, useNamespace = alwaysNull } = useContext(NamespaceContext);
	const namespace = useNamespace(feature || DEFAULT_FEATURE, namespaces);

	return namespaces[feature] || namespace || namespaces[DEFAULT_FEATURE];
};

export default useNamespace;
