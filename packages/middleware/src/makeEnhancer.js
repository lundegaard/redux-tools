import { map, compose, uniq, o, forEach } from 'ramda';
import { enhanceStore, makeConfig } from '@redux-tools/injectors';
import { isActionFromNamespace, attachNamespace } from '@redux-tools/namespaces';
import invariant from 'invariant';

export const config = makeConfig('middleware');

const noopEntry = {
	key: '@redux-tools/NOOP_MIDDLEWARE',
	value: () => next => action => next(action),
};

const makeEnhancer = () => {
	// NOTE: Keys are entries, values are middleware with bound `dispatch` and `getState`.
	let initializedEntries = new Map();

	// NOTE: Sadly, because of how enhancers and middleware work, we need some escape hatches
	// from scopes and closures. This is ugly, but I don't think we can solve this differently.
	let outerNext;

	// NOTE: This default implementation is necessary to ensure that the middleware works even without
	// any injected middleware.
	let enhancerNext = action => {
		invariant(outerNext, 'You need to apply the enhancer to a Redux store.');
		outerNext(action);
	};

	const injectedMiddleware = () => next => {
		if (!outerNext) {
			outerNext = next;
		}

		return action => enhancerNext(action);
	};

	// NOTE: composeEntries :: [Entry] -> Next
	const composeEntries = entries => {
		const chain = map(entry => {
			const { namespace } = entry;

			// NOTE: `innerNext` is either the next injected middleware or `outerNext`.
			return innerNext => {
				// NOTE: `entryNext` is a wrapper over the currently iterated-over injected middleware.
				const entryNext = initializedEntries.get(entry)(o(innerNext, attachNamespace(namespace)));

				return action =>
					isActionFromNamespace(namespace, action) ? entryNext(action) : innerNext(action);
			};
		}, entries);

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
				...uniq(config.getEntries(nextStore)),
				// NOTE: This is just a safeguard, because although `R.compose` is variadic,
				// it still needs at least one function as an argument.
				noopEntry,
			];

			const nextInitializedEntries = new Map();

			// NOTE: We copy all necessary entries because it's simpler/faster than finding what has changed.
			forEach(
				entry =>
					nextInitializedEntries.set(
						entry,
						initializedEntries.get(entry) || entry.value(nextStore)
					),
				nextEntries
			);

			initializedEntries = nextInitializedEntries;
			enhancerNext = composeEntries(nextEntries);
		};

		const nextStore = enhanceStore(prevStore, config, {
			onInjected: handleEntriesChanged,
			onEjected: handleEntriesChanged,
		});

		return nextStore;
	};

	enhancer.injectedMiddleware = injectedMiddleware;

	return enhancer;
};

export default makeEnhancer;
