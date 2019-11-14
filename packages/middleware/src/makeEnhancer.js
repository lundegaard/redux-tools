import { map, compose, uniq, forEach, o } from 'ramda';
import { enhanceStore, makeStoreInterface } from '@redux-tools/injectors';
import { isActionFromNamespace, defaultNamespace } from '@redux-tools/namespaces';
import { getStateByNamespace } from '@redux-tools/reducers';
import invariant from 'invariant';

export const storeInterface = makeStoreInterface('middleware');

const noopEntry = {
	key: '@redux-tools/NOOP_MIDDLEWARE',
	value: () => next => action => next(action),
};

const makeEnhancer = () => {
	// NOTE: Keys are entries, values are middleware with bound `dispatch` and `getState`.
	let initializedEntries = new Map();

	// NOTE: Sadly, because of how enhancers and middleware are structured, we need some escape hatches
	// from scopes and closures. This is ugly, but I don't think we can solve this differently.
	// NOTE: `outerNext` is either the next middleware in `applyMiddleware` or `store.dispatch`.
	let outerNext;

	// NOTE: This default implementation is necessary to ensure that the middleware works even without
	// any injected middleware.
	// NOTE `enhancerNext` calls all injected middleware and then `outerNext`.
	let enhancerNext = action => {
		invariant(outerNext, 'You need to apply the enhancer to a Redux store.');
		return outerNext(action);
	};

	const injectedMiddleware = () => next => {
		invariant(!outerNext, 'You cannot apply the injected middleware to multiple Redux stores.');
		outerNext = next;

		return action => enhancerNext(action);
	};

	// NOTE: composeEntries :: [Entry] -> Next
	const composeEntries = entries => {
		const chain = map(entry => {
			const { namespace } = entry;

			// NOTE: `innerNext` is either the next injected middleware or `outerNext`.
			return innerNext => {
				// NOTE: `entryNext` is a wrapper over the currently iterated-over injected middleware.
				const entryNext = initializedEntries.get(entry)(innerNext);

				return action =>
					isActionFromNamespace(namespace, action) ? entryNext(action) : innerNext(action);
			};
		}, entries);

		// NOTE: `pipe` is used to preserve injection order.
		return compose(...chain)(outerNext);
	};

	const enhancer = createStore => (...args) => {
		const prevStore = createStore(...args);

		// NOTE: All of this logic is just to achieve the following behaviour:
		// Every middleware is curried. In standard Redux, the first two arguments are bound immediately.
		// However, when injecting the middleware, we are not able to easily provide the second argument
		// immediately, because it changes whenever an entry is injected or ejected. That's why we only
		// bind the first argument and then provide `next` once per any injection call. This behaviour
		// is covered by unit tests, which may help explain this better.
		const handleEntriesChanged = () => {
			const nextEntries = [
				...uniq(storeInterface.getEntries(nextStore)),
				// NOTE: This is just a safeguard, because although `R.compose` is variadic,
				// it still needs at least one function as an argument.
				noopEntry,
			];

			const nextInitializedEntries = new Map();

			// NOTE: We copy all necessary entries because it's simpler/faster than finding what has changed.
			forEach(entry => {
				const { namespace } = entry;
				const { dispatch, getState } = nextStore;

				nextInitializedEntries.set(
					entry,
					initializedEntries.get(entry) ||
						entry.value({
							namespace,
							dispatch: o(dispatch, defaultNamespace(namespace)),
							getState: nextStore.getState,
							getNamespacedState: namespace
								? (feature = entry.feature) => getStateByNamespace(feature, namespace, getState())
								: null,
						})
				);
			}, nextEntries);

			initializedEntries = nextInitializedEntries;
			enhancerNext = composeEntries(nextEntries);
		};

		const nextStore = enhanceStore(prevStore, storeInterface, {
			onInjected: handleEntriesChanged,
			onEjected: handleEntriesChanged,
		});

		return nextStore;
	};

	enhancer.injectedMiddleware = injectedMiddleware;

	return enhancer;
};

export default makeEnhancer;
