import React from 'react';
import { mount } from 'enzyme';
import { always } from 'ramda';
import { noop, alwaysNull } from 'ramda-extension';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';
import { ReactReduxContext } from 'react-redux';

import Provider from './Provider';
import { NamespaceContext } from './contexts';

describe('Provider', () => {
	const store = { subscribe: noop, dispatch: noop, getState: noop };
	const renderProp = jest.fn(alwaysNull);
	const alwaysFoo = always('foo');

	beforeEach(() => jest.resetAllMocks());

	it('passes props to NamespaceContext correctly', () => {
		mount(
			<Provider namespace="ns" useNamespace={alwaysFoo}>
				<NamespaceContext.Consumer>{renderProp}</NamespaceContext.Consumer>
			</Provider>
		);

		expect(renderProp).toHaveBeenCalledWith({
			namespaces: { [DEFAULT_FEATURE]: 'ns' },
			useNamespace: alwaysFoo,
		});
	});

	it('allows seamless nesting', () => {
		mount(
			<Provider namespace="ns">
				<Provider useNamespace={alwaysFoo}>
					<Provider namespace="yo">
						<NamespaceContext.Consumer>{renderProp}</NamespaceContext.Consumer>
					</Provider>
				</Provider>
			</Provider>
		);

		expect(renderProp).toHaveBeenCalledWith({
			namespaces: { [DEFAULT_FEATURE]: 'yo' },
			useNamespace: alwaysFoo,
		});
	});

	it('allows seamless nesting with features', () => {
		mount(
			<Provider namespace="ns" feature="grids">
				<Provider useNamespace={alwaysFoo}>
					<Provider namespace="yo">
						<NamespaceContext.Consumer>{renderProp}</NamespaceContext.Consumer>
					</Provider>
				</Provider>
			</Provider>
		);

		expect(renderProp).toHaveBeenCalledWith({
			namespaces: { [DEFAULT_FEATURE]: 'yo', grids: 'ns' },
			useNamespace: alwaysFoo,
		});
	});

	it('uses a react-redux provider if store is passed', () => {
		mount(
			<Provider store={store}>
				<ReactReduxContext.Consumer>{renderProp}</ReactReduxContext.Consumer>
			</Provider>
		);

		expect(renderProp.mock.calls[0][0].store).toBe(store);
	});
});
