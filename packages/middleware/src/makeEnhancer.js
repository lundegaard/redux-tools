import { o, concat, keys, map, compose, isEmpty, uniq, identity } from 'ramda';
import { createEntries } from '@redux-tools/injectors';
import { isActionFromNamespace, attachNamespace } from '@redux-tools/namespaces';
import { memoizeWithIdentity } from 'ramda-extension';
import { withoutOnce } from '@redux-tools/utils';

import { middlewareInjected, middlewareEjected } from './actions';

export default function makeEnhancer({ getMiddlewareAPI = identity } = {}) {
	let entries = [];

	const injectedMiddleware = ({ getState, dispatch }) => next => action => {
		const makeChain = memoizeWithIdentity(
			o(
				map(({ namespace, value, ...otherProps }) => next => action =>
					isActionFromNamespace(namespace, action)
						? value(getMiddlewareAPI({ getState, dispatch, action, namespace, ...otherProps }))(
								o(next, attachNamespace(namespace))
						  )(action)
						: next(action)
				),
				uniq
			)
		);

		const chain = makeChain(entries);
		const composableChain = isEmpty(chain) ? [next => action => next(action)] : chain;

		return compose(...composableChain)(next)(action);
	};

	const enhancer = createStore => (...args) => {
		const store = createStore(...args);

		store.middlewareEntries = [];

		store.injectMiddleware = (middleware, props) => {
			store.middlewareEntries = concat(store.middlewareEntries, createEntries(middleware, props));

			store.dispatch(middlewareInjected({ middleware: keys(middleware), ...props }));
			entries = store.middlewareEntries;
		};

		store.ejectMiddleware = (middleware, props) => {
			store.middlewareEntries = withoutOnce(
				createEntries(middleware, props),
				store.middlewareEntries
			);

			store.dispatch(middlewareEjected({ middleware: keys(middleware), ...props }));
			entries = store.middlewareEntries;
		};

		return store;
	};

	enhancer.injectedMiddleware = injectedMiddleware;

	return enhancer;
}
