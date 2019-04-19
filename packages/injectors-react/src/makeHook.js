import { useLayoutEffect, useState, useEffect, useDebugValue } from 'react';
import { keys, all, includes, omit } from 'ramda';
import { toPascalCase, isNotNil, rejectNil, isObject } from 'ramda-extension';
import invariant from 'invariant';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { createEntries } from '@redux-tools/injectors';

import useInjectorContext from './useInjectorContext';
import { IS_SERVER } from './constants';

const useUniversalLayoutEffect = IS_SERVER ? useEffect : useLayoutEffect;
const getOtherProps = omit(['isGlobal', 'global', 'isPersistent', 'persist']);

const makeHook = config => {
	invariant(isObject(config), 'The injector config is undefined.');

	const { getEntries, ejectionKey, injectionKey, type } = config;

	const pascalCaseType = toPascalCase(type);
	const hookName = `use${pascalCaseType}`;

	const useInjectables = (injectables, options = {}) => {
		const injectableKeys = keys(injectables);

		const locationMessage =
			`@redux-tools: This warning happened while injecting the following ${type}: ` +
			`${injectableKeys}.`;

		const warn = (...args) => console.warn(locationMessage, ...args);

		// NOTE: `options.global` and `options.persist` are deprecated.
		const isGlobal = options.isGlobal || options.global || false;
		const isPersistent = options.isPersistent || options.persist || false;
		const feature = options.feature || DEFAULT_FEATURE;
		const injectorContext = useInjectorContext(feature);
		const { store } = injectorContext;
		const namespace = isGlobal ? null : options.namespace || injectorContext.namespace;
		const inject = store[injectionKey];
		const eject = store[ejectionKey];

		// NOTE: On the server, the injectables should be injected beforehand.
		const [isInitialized, setIsInitialized] = useState(IS_SERVER);

		const props = rejectNil({
			...getOtherProps(options),
			feature,
			namespace,
		});

		// TODO: Refactor when React DevTools support multiple debug values or non-primitive structures.
		useDebugValue(
			String([
				`Namespace: ${namespace}`,
				`Feature: ${feature}`,
				`${pascalCaseType}: ${injectableKeys}`,
				`Initialized: ${isInitialized}`,
			])
		);

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
			if (isGlobal && feature !== DEFAULT_FEATURE) {
				warn(
					`You are using a feature (${feature}) with global ${type}.`,
					'This will have no effect.'
				);
			}

			if (!namespace && !isGlobal) {
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

			invariant(inject, `'store.${injectionKey}' missing. Are you using the enhancer correctly?`);
			invariant(eject, `'store.${ejectionKey}' missing. Are you using the enhancer correctly?`);

			inject(injectables, props);
			setIsInitialized(true);

			return () => {
				if (!isPersistent) {
					eject(injectables, props);
				}
			};
		}, []);

		return isInitialized;
	};

	return useInjectables;
};

export default makeHook;
