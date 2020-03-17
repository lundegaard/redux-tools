import { useLayoutEffect, useState, useEffect, useDebugValue, useContext } from 'react';
import { keys, all, includes, omit } from 'ramda';
import { toPascalCase, isNotNil, rejectNil, isObject } from 'ramda-extension';
import invariant from 'invariant';
import { ReactReduxContext } from 'react-redux';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { createEntries } from '@redux-tools/injectors';
import { useNamespace } from '@redux-tools/namespaces-react';

import { IS_SERVER } from './constants';

const useUniversalLayoutEffect = IS_SERVER ? useEffect : useLayoutEffect;
const getOtherProps = omit(['isGlobal', 'global', 'isPersistent', 'persist']);

const makeHook = storeInterface => {
	invariant(isObject(storeInterface), 'The store interface is undefined.');

	const { getEntries, ejectionKey, injectionKey, type } = storeInterface;

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
		const contextNamespace = useNamespace(feature);
		const { store } = useContext(ReactReduxContext);
		const namespace = isGlobal ? null : options.namespace || contextNamespace;
		const inject = store[injectionKey];
		const eject = store[ejectionKey];
		// NOTE: We use a string instead of comparing the objects by reference to avoid remounting
		// when `useInjectables({ something })` is used (new object with same entries).
		// TODO: Support partial changes in the `injectables` object.
		const injectablesHash = JSON.stringify(injectableKeys);

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

		const effectDependencies = [
			namespace,
			feature,
			isGlobal,
			isPersistent,
			inject,
			eject,
			injectablesHash,
		];

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
		}, effectDependencies);

		return isInitialized;
	};

	return useInjectables;
};

export default makeHook;
