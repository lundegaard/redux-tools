import { o, map, compose, isEmpty, uniq, identity } from 'ramda';
import { enhanceStore } from '@redux-tools/injectors';
import { isActionFromNamespace, attachNamespace } from '@redux-tools/namespaces';
import { memoizeWithIdentity } from 'ramda-extension';

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

		const handler = () => (entries = store.entries.middleware);

		enhanceStore(store, 'middleware', {
			onInjected: handler,
			onEjected: handler,
		});

		return store;
	};

	enhancer.injectedMiddleware = injectedMiddleware;

	return enhancer;
}
