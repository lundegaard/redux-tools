import { alwaysNull } from 'ramda-extension';
import { createContext } from 'react';

export const NamespaceContext = createContext({
	namespaces: {},
	useNamespace: alwaysNull,
	isUseNamespaceProvided: false,
});
