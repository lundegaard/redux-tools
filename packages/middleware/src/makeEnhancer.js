import { concat, both, reject, keys, o, map, compose, isEmpty } from 'ramda';
import { createEntries, isEntryEjectableByVersion, isEntryIncluded } from '@redux-tools/injectors';
import { isActionFromNamespace, attachNamespace } from '@redux-tools/namespaces';

import { middlewareInjected, middlewareEjected } from './actions';

export default function makeEnhancer() {
	let middlewareEntries = [];

	const injectedMiddleware = middlewareAPI => next => action => {
		const chain = map(
			({ namespace, value }) => next => action =>
				isActionFromNamespace(namespace, action)
					? value(middlewareAPI)(o(next, attachNamespace(namespace)))(action)
					: next(action),
			middlewareEntries
		);

		const composableChain = isEmpty(chain) ? [next => action => next(action)] : chain;

		return compose(...composableChain)(next)(action);
	};

	const enhancer = createStore => (...args) => {
		const store = createStore(...args);

		store.injectMiddleware = (middleware, { namespace, version }) => {
			middlewareEntries = concat(
				middlewareEntries,
				createEntries(middleware, { namespace, version })
			);

			store.dispatch(middlewareInjected({ middleware: keys(middleware), namespace, version }));
			store._middlewareEntries = middlewareEntries;
		};

		store.ejectMiddleware = (middleware, { namespace, version }) => {
			middlewareEntries = reject(
				both(
					isEntryEjectableByVersion(version),
					isEntryIncluded(createEntries(middleware, { namespace, version }))
				),
				middlewareEntries
			);

			store.dispatch(middlewareEjected({ middleware: keys(middleware), namespace, version }));
			store._middlewareEntries = middlewareEntries;
		};

		return store;
	};

	enhancer.injectedMiddleware = injectedMiddleware;

	return enhancer;
}
