import { createContext } from 'react';
import { alwaysNull } from 'ramda-extension';

export const NamespaceContext = createContext({
	namespaces: {},
	useNamespace: alwaysNull,
});
