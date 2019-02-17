import React from 'react';
import { mount } from 'enzyme';
import { identity } from 'ramda';
import { noop, alwaysNull } from 'ramda-extension';

import Provider from './Provider';
import { InjectorContext } from './contexts';

describe('Provider', () => {
	const store = { subscribe: noop, dispatch: noop, getState: noop };
	const renderProp = jest.fn(alwaysNull);

	beforeEach(() => jest.resetAllMocks());

	it('passes props to InjectorContext correctly', () => {
		mount(
			<Provider namespace="ns" store={store} withNamespace={identity}>
				<InjectorContext.Consumer>{renderProp}</InjectorContext.Consumer>
			</Provider>
		);

		expect(renderProp).toHaveBeenCalledWith({
			store,
			features: { namespaces: 'ns' },
			withNamespace: identity,
		});
	});

	it('allows seamless nesting', () => {
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

		expect(renderProp).toHaveBeenCalledWith({
			store,
			features: { namespaces: 'yo' },
			withNamespace: identity,
		});
	});

	it('allows seamless nesting with features', () => {
		mount(
			<Provider namespace="ns" feature="grids">
				<Provider store={store}>
					<Provider withNamespace={identity}>
						<Provider namespace="yo">
							<InjectorContext.Consumer>{renderProp}</InjectorContext.Consumer>
						</Provider>
					</Provider>
				</Provider>
			</Provider>
		);

		expect(renderProp).toHaveBeenCalledWith({
			store,
			features: { namespaces: 'yo', grids: 'ns' },
			withNamespace: identity,
		});
	});

	it('supports `getNamespace` to allow using features within widgets', () => {
		mount(
			<Provider namespace="ns" store={store}>
				<Provider getNamespace={({ namespaces }) => `${namespaces}-grid`} feature="grids">
					<InjectorContext.Consumer>{renderProp}</InjectorContext.Consumer>
				</Provider>
			</Provider>
		);

		expect(renderProp).toHaveBeenCalledWith({
			store,
			features: { namespaces: 'ns', grids: 'ns-grid' },
			withNamespace: identity,
		});
	});
});
