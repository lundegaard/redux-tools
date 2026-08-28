import * as actions from '@redux-tools/actions';
import * as middleware from '@redux-tools/middleware';
import * as middlewareReact from '@redux-tools/middleware-react';
import * as namespaces from '@redux-tools/namespaces';
import * as namespacesReact from '@redux-tools/namespaces-react';
import * as reducers from '@redux-tools/reducers';
import * as reducersReact from '@redux-tools/reducers-react';

import * as reduxTools from '.';

const packages = {
	'@redux-tools/actions': actions,
	'@redux-tools/middleware': middleware,
	'@redux-tools/middleware-react': middlewareReact,
	'@redux-tools/namespaces': namespaces,
	'@redux-tools/namespaces-react': namespacesReact,
	'@redux-tools/reducers': reducers,
	'@redux-tools/reducers-react': reducersReact,
};

// NOTE: `makeEnhancer` is exported by two packages, so both are re-exported under a prefixed name.
const aliases = {
	'@redux-tools/middleware': { makeEnhancer: 'makeMiddlewareEnhancer' },
	'@redux-tools/reducers': { makeEnhancer: 'makeReducersEnhancer' },
};

// NOTE: `storeInterface` is exported by two packages under the same name and is only useful when
// working with the injector internals, so it is deliberately not re-exported.
const omittedExports = {
	'@redux-tools/middleware': ['storeInterface'],
	'@redux-tools/reducers': ['storeInterface'],
};

describe('index', () => {
	Object.keys(packages).forEach(name => {
		it(`re-exports the public API of ${name}`, () => {
			const omitted = omittedExports[name] || [];
			const aliasesOfPackage = aliases[name] || {};

			const missingExports = Object.keys(packages[name])
				.filter(key => !omitted.includes(key))
				.filter(key => reduxTools[aliasesOfPackage[key] || key] !== packages[name][key]);

			expect(missingExports).toEqual([]);
		});
	});
});
