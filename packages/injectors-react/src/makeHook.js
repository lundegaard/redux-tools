import invariant from 'invariant';
import { all, includes, omit } from 'ramda';
import { toPascalCase, isNotNil, rejectNil, isObject } from 'ramda-extension';
import { useLayoutEffect, useState, useEffect, useDebugValue, useContext } from 'react';
import { ReactReduxContext } from 'react-redux';

import { createEntries } from '@redux-tools/injectors';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { useNamespace, NamespaceContext } from '@redux-tools/namespaces-react';

import { IS_SERVER } from './constants';

const useUniversalLayoutEffect = IS_SERVER ? useEffect : useLayoutEffect;
const getOtherProps = omit(['isGlobal', 'global', 'isPersistent', 'persist']);

const makeHook = storeInterface => {
	invariant(isObject(storeInterface), 'The store interface is undefined.');

	const { getEntries, ejectionKey, injectionKey, type } = storeInterface;

	const pascalCaseType = toPascalCase(type);
	const hookName = `use${pascalCaseType}`;

	const useInjectables = (injectables, options = {}) => {
		const locationMessages = [`@redux-tools ${type}`, injectables];

		const warn = (...args) => console.warn(...locationMessages, ...args);

		// NOTE: `options.global` and `options.persist` are deprecated.
		const isGlobal = options.isGlobal ?? options.global ?? false;
		const isPersistent = options.isPersistent ?? options.persist ?? false;
		const isNamespaced = options.isNamespaced ?? false;
		const feature = options.feature ?? null;
		const contextNamespace = useNamespace(feature);
		const { store } = useContext(ReactReduxContext);
		const { isUseNamespaceProvided } = useContext(NamespaceContext);
		const namespace = isGlobal ? null : options.namespace ?? contextNamespace;
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
				`Type: ${pascalCaseType}`,
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
			injectables,
		];

		// NOTE: This doesn't run on the server, but won't trigger `useLayoutEffect` warnings either.
		useUniversalLayoutEffect(() => {
			if (isGlobal && feature !== DEFAULT_FEATURE) {
				warn(
					`You are using a feature (${feature}) with global ${type}.`,
					'This will have no effect.'
				);
			}

			if (isUseNamespaceProvided && !namespace && !isGlobal) {
				warn(
					`You're injecting ${type}, but the namespace could not be resolved from React context!`,
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

			invariant(
				!isNamespaced || namespace,
				`You're injecting ${type} marked as namespaced, but no namespace could be resolved.`
			);

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
