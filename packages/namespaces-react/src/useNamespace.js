import { alwaysNull } from 'ramda-extension';
import { useContext } from 'react';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import { NamespaceContext } from './contexts';

const useNamespace = feature => {
	const { namespaces = {}, useNamespace = alwaysNull } = useContext(NamespaceContext);
	const namespace = useNamespace(feature ?? DEFAULT_FEATURE, namespaces);

	return namespaces[feature] ?? namespace ?? null;
};

export default useNamespace;
