import { useEffect, useState } from 'react';
import { all, keys, includes, isNil } from 'ramda';
import { toPascalCase, alwaysEmptyArray, isNotNil } from 'ramda-extension';
import invariant from 'invariant';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { createEntries } from '@redux-tools/injectors';

import useInjectorContext from './useInjectorContext';

const makeHook = (configuration = {}) => (injectables, options = {}) => {
	const { eject, getEntries = alwaysEmptyArray, inject, type = 'injectables' } = configuration;

	invariant(eject, 'The ejection handler must be defined.');
	invariant(inject, 'The injection handler must be defined.');

	const { feature = DEFAULT_FEATURE } = options;
	const isGlobal = options.isGlobal || options.global || false;
	const shouldEject = isNil(options.shouldEject) || options.shouldEject || !options.persist;

	const { store, namespace } = useInjectorContext(feature);

	const [isInitialized, setIsInitialized] = useState(() =>
		all(entry => includes(entry, getEntries(store)), createEntries(injectables, { feature }))
	);

	useEffect(() => {
		const resolvedNamespace = isGlobal ? null : namespace;
		const hookName = `use${toPascalCase(type)}`;
		const locationMessage = `Attempting to inject following ${type}: ${keys(injectables)}.`;

		invariant(
			!feature || !isGlobal,
			`${locationMessage} You cannot pass a feature to global ${type}.`
		);

		if (!resolvedNamespace && !isGlobal) {
			console.warn(
				locationMessage,
				"You're using a @redux-tools injector with no namespace!",
				'It will behave like a global injector. If this is intended, consider passing',
				`'isGlobal: true' to the injector, e.g. '${hookName}(${type}, { isGlobal: true })'.`
			);
		}

		if (isNotNil(options.global)) {
			console.warn(`'global: ${options.global}' is deprecated. Use 'isGlobal: ${options.global}'.`);
		}

		if (isNotNil(options.persist)) {
			console.warn(
				`'persist: ${options.persist}' is deprecated. Use 'shouldEject: ${!options.persist}'.`
			);
		}

		inject(store)(injectables, {
			namespace: resolvedNamespace,
			feature,
		});

		setIsInitialized(true);

		return () => {
			if (shouldEject) {
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
