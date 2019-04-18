import React from 'react';
import { mount } from 'enzyme';
import { always } from 'ramda';
import { noop, alwaysNull } from 'ramda-extension';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import Provider from './Provider';
import { InjectorContext } from './contexts';

describe('Provider', () => {
	const store = { subscribe: noop, dispatch: noop, getState: noop };
	const renderProp = jest.fn(alwaysNull);
	const alwaysFoo = always('foo');

	beforeEach(() => jest.resetAllMocks());

	it('passes props to InjectorContext correctly', () => {
		mount(
			<Provider namespace="ns" store={store} useNamespace={alwaysFoo}>
				<InjectorContext.Consumer>{renderProp}</InjectorContext.Consumer>
			</Provider>
		);

		expect(renderProp).toHaveBeenCalledWith({
			store,
			namespaces: { [DEFAULT_FEATURE]: 'ns' },
			useNamespace: alwaysFoo,
		});
	});

	it('allows seamless nesting', () => {
		mount(
			<Provider namespace="ns">
				<Provider store={store}>
					<Provider useNamespace={alwaysFoo}>
						<Provider namespace="yo">
							<InjectorContext.Consumer>{renderProp}</InjectorContext.Consumer>
						</Provider>
					</Provider>
				</Provider>
			</Provider>
		);

		expect(renderProp).toHaveBeenCalledWith({
			store,
			namespaces: { [DEFAULT_FEATURE]: 'yo' },
			useNamespace: alwaysFoo,
		});
	});

	it('allows seamless nesting with features', () => {
		mount(
			<Provider namespace="ns" feature="grids">
				<Provider store={store}>
					<Provider useNamespace={alwaysFoo}>
						<Provider namespace="yo">
							<InjectorContext.Consumer>{renderProp}</InjectorContext.Consumer>
						</Provider>
					</Provider>
				</Provider>
			</Provider>
		);

		expect(renderProp).toHaveBeenCalledWith({
			store,
			namespaces: { [DEFAULT_FEATURE]: 'yo', grids: 'ns' },
			useNamespace: alwaysFoo,
		});
	});
});
