import { createContext } from 'react';
import { identity } from 'ramda';

export const InjectorContext = createContext({
	store: null,
	features: {},
	withNamespace: identity,
});
