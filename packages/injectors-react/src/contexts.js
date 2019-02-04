import { createContext } from 'react';
import { identity } from 'nanoutils';

export const InjectorContext = createContext({
	store: null,
	namespace: null,
	withNamespace: identity,
});
