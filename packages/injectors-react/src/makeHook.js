import { useEffect, useState, useMemo } from 'react';
import { all, keys, includes } from 'ramda';
import { toPascalCase, alwaysEmptyArray } from 'ramda-extension';
import invariant from 'invariant';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { createEntries } from '@redux-tools/injectors';

import useInjectorContext from './useInjectorContext';

const makeHook = (configuration = {}) => (injectables, options = {}) => {
	const { eject, getEntries = alwaysEmptyArray, inject, name = 'injectables' } = configuration;

	invariant(eject, 'The ejection handler must be defined.');
	invariant(inject, 'The injection handler must be defined.');

	const { global = false, feature = DEFAULT_FEATURE, persist = false } = options;
	const { store, namespace } = useInjectorContext(feature);

	const areEntriesAlreadyIncluded = useMemo(
		() => all(entry => includes(entry, getEntries(store)), createEntries(injectables)),
		[store, getEntries, injectables]
	);

	const [isInitialized, setIsInitialized] = useState(areEntriesAlreadyIncluded);

	useEffect(() => {
		const resolvedNamespace = global ? null : namespace;
		const hookName = `use${toPascalCase(name)}`;
		const locationMessage = `Attempting to inject ${keys(injectables)} ${name}.`;

		invariant(
			!feature || !global,
			`${locationMessage} You cannot pass a feature to global injectables.`
		);

		if (!resolvedNamespace && !global) {
			console.warn(
				locationMessage,
				"You're using a @redux-tools injector with 'global: false' and no namespace! " +
					'It will behave like a global injector. If this is intended, consider passing ' +
					`'global: true' to the injector, e.g. '${hookName}(${name}, { global: true })'.`
			);
		}

		inject(store)(injectables, {
			namespace: resolvedNamespace,
			feature,
		});

		setIsInitialized(true);

		return () => {
			if (!persist) {
				eject(store)(injectables, {
					namespace: resolvedNamespace,
					feature,
				});
			}
		};
	}, []);

	return isInitialized;
};

export default makeHook;
