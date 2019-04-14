import { useLayoutEffect, useState, useEffect } from 'react';
import { keys, all, includes, omit } from 'ramda';
import { toPascalCase, isNotNil, alwaysEmptyArray, rejectNil } from 'ramda-extension';
import invariant from 'invariant';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { createEntries } from '@redux-tools/injectors';

import useInjectorContext from './useInjectorContext';
import { IS_SERVER } from './constants';

const useUniversalLayoutEffect = IS_SERVER ? useEffect : useLayoutEffect;
const getOtherProps = omit(['isGlobal', 'global', 'isPersistent', 'persist']);

const makeHook = (configuration = {}) => {
	const { eject, getEntries = alwaysEmptyArray, inject, type = 'injectables' } = configuration;

	invariant(eject, 'The ejection handler must be defined.');
	invariant(inject, 'The injection handler must be defined.');

	const hookName = `use${toPascalCase(type)}`;

	// HACK: https://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
	const useInjectables = {
		[hookName]: (injectables, options = {}) => {
			const locationMessage =
				`@redux-tools: This warning happened while injecting the following ${type}: ` +
				`${keys(injectables)}.`;

			const warn = (...args) => console.warn(locationMessage, ...args);

			// NOTE: `options.global` and `options.persist` are deprecated.
			const isGlobal = options.isGlobal || options.global || false;
			const isPersistent = options.isPersistent || options.persist || false;

			const { feature } = options;
			// NOTE: Only use `DEFAULT_FEATURE` here, because we don't have any defaulting
			// in `createEntries()`. We need `store.injectSomething()` and `useInjectables()`
			// to create the same entries (i.e. without the default feature).
			const { namespace, store } = useInjectorContext(feature || DEFAULT_FEATURE);

			// NOTE: On the server, the injectables should be injected beforehand.
			const [isInitialized, setIsInitialized] = useState(IS_SERVER);

			const resolvedFeature = isGlobal ? null : feature;
			const resolvedNamespace = isGlobal ? null : namespace;
			const otherProps = getOtherProps(options);

			const props = rejectNil({
				...otherProps,
				feature: resolvedFeature,
				namespace: resolvedNamespace,
			});

			if (IS_SERVER) {
				const areEntriesAlreadyInjected = all(
					entry => includes(entry, getEntries(store)),
					createEntries(injectables, props)
				);

				if (!areEntriesAlreadyInjected) {
					warn(
						`When rendering on the server, inject all ${type} before calling`,
						"'ReactDOMServer.renderToString()'. You should do this inside an",
						"'async getInitialProps()' function, i.e. where you fetch data and",
						'do other side effects. If you need to do server-side injections',
						'during rendering, open an issue.'
					);
				}
			}

			// NOTE: This doesn't run on the server, but won't trigger `useLayoutEffect` warnings either.
			useUniversalLayoutEffect(() => {
				if (feature && isGlobal) {
					warn(`You cannot use a feature with global ${type}, it will be ignored.`);
				}

				if (!resolvedNamespace && !isGlobal) {
					warn(
						`You're injecting ${type} with no namespace!`,
						'They will be injected globally. If this is intended, consider passing',
						`'isGlobal: true' to the injector, e.g. '${hookName}(${type}, { isGlobal: true })'.`
					);
				}

				if (isNotNil(options.global)) {
					warn(`'global: ${options.global}' is deprecated. Use 'isGlobal: ${options.global}'.`);
				}

				if (isNotNil(options.persist)) {
					warn(
						`'persist: ${options.persist}' is deprecated. Use 'isPersistent: ${options.persist}'.`
					);
				}

				inject(store)(injectables, props);
				setIsInitialized(true);

				return () => {
					if (!isPersistent) {
						eject(store)(injectables, props);
					}
				};
			}, []);

			return isInitialized;
		},
	}[hookName];

	return useInjectables;
};

export default makeHook;
