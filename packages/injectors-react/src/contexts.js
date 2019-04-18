import { createContext } from 'react';
import { alwaysNull } from 'ramda-extension';

export const InjectorContext = createContext({
	store: null,
	namespaces: {},
	useNamespace: alwaysNull,
});
