import { mount } from 'enzyme';
import { alwaysNull } from 'ramda-extension';
import React from 'react';

import { NamespaceContext } from './contexts';
import withNamespaceProvider from './withNamespaceProvider';

describe('withNamespaceProvider', () => {
	const renderProp = jest.fn(alwaysNull);

	beforeEach(() => jest.resetAllMocks());

	const ComponentWithProvider = withNamespaceProvider({ namespace: 'foo', feature: 'fooFeature' })(
		NamespaceContext.Consumer
	);

	it('passes props to NamespaceContext correctly with option props taking priority over props', () => {
		mount(
			<ComponentWithProvider namespace="bar" feature="barFeature">
				{renderProp}
			</ComponentWithProvider>
		);

		expect(renderProp).toHaveBeenCalledWith({
			namespaces: { ['fooFeature']: 'foo' },
			useNamespace: alwaysNull,
		});
	});
});
