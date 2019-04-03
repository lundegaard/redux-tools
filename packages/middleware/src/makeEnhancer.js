import { o, concat, both, reject, keys, map, compose, isEmpty, uniqWith, identity } from 'ramda';
import {
	createEntries,
	isEntryEjectableByVersion,
	isEntryIncluded,
	areEntriesEqual,
} from '@redux-tools/injectors';
import { isActionFromNamespace, attachNamespace, DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { memoizeWithIdentity } from 'ramda-extension';

import { middlewareInjected, middlewareEjected } from './actions';

export default function makeEnhancer({ getMiddlewareAPI = identity } = {}) {
	let middlewareEntries = [];

	const injectedMiddleware = ({ getState, dispatch }) => next => action => {
		const makeChain = memoizeWithIdentity(
			o(
				map(({ feature, namespace, value }) => next => action =>
					isActionFromNamespace(namespace, action)
						? value(getMiddlewareAPI({ getState, dispatch, action, namespace, feature }))(
								o(next, attachNamespace(namespace))
						  )(action)
						: next(action)
				),
				uniqWith(areEntriesEqual)
			)
		);

		const chain = makeChain(middlewareEntries);
		const composableChain = isEmpty(chain) ? [next => action => next(action)] : chain;

		return compose(...composableChain)(next)(action);
	};

	const enhancer = createStore => (...args) => {
		const store = createStore(...args);

		store.injectMiddleware = (middleware, { namespace, version, feature = DEFAULT_FEATURE }) => {
			middlewareEntries = concat(
				middlewareEntries,
				createEntries(middleware, { namespace, version, feature })
			);

			store.dispatch(
				middlewareInjected({
					middleware: keys(middleware),
					namespace,
					version,
					feature,
				})
			);

			store._middlewareEntries = middlewareEntries;
		};

		store.ejectMiddleware = (middleware, { namespace, version, feature = DEFAULT_FEATURE }) => {
			middlewareEntries = reject(
				both(
					isEntryEjectableByVersion(version),
					isEntryIncluded(createEntries(middleware, { namespace, version, feature }))
				),
				middlewareEntries
			);

			store.dispatch(
				middlewareEjected({
					middleware: keys(middleware),
					namespace,
					version,
					feature,
				})
			);

			store._middlewareEntries = middlewareEntries;
		};

		return store;
	};

	enhancer.injectedMiddleware = injectedMiddleware;

	return enhancer;
}
