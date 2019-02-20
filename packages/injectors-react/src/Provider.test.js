import React from 'react';
import { mount } from 'enzyme';
import { identity } from 'nanoutils';
import { noop, alwaysNull } from 'ramda-extension';

import Provider from './Provider';
import { InjectorContext } from './contexts';

describe('Provider', () => {
	const store = { subscribe: noop, dispatch: noop, getState: noop };
	const renderProp = jest.fn(alwaysNull);

	beforeEach(() => jest.resetAllMocks());

	// TODO: fix it
	it.skip('passes props to InjectorContext correctly', () => {
		mount(
			<Provider namespace="ns" store={store} withNamespace={identity}>
				<InjectorContext.Consumer>{renderProp}</InjectorContext.Consumer>
			</Provider>
		);

		expect(renderProp).toHaveBeenCalledWith({ store, namespace: 'ns', withNamespace: identity });
	});

	// TODO: fix it
	it.skip('allows seamless nesting', () => {
		mount(
			<Provider namespace="ns">
				<Provider store={store}>
					<Provider withNamespace={identity}>
						<Provider namespace="yo">
							<InjectorContext.Consumer>{renderProp}</InjectorContext.Consumer>
						</Provider>
					</Provider>
				</Provider>
			</Provider>
		);

		expect(renderProp).toHaveBeenCalledWith({ store, namespace: 'yo', withNamespace: identity });
	});
});
