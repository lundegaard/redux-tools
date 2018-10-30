import { mount } from 'enzyme';
import React from 'react';
import { createStore } from 'redux';
import * as R from 'ramda';
import { WidgetContext } from 'react-union';

import Provider from '../components/Provider';
import { SUFFIX_DELIMITER } from '../constants';
import withRedux from './withRedux';

describe('withRedux', () => {
	const store = createStore(R.identity);

	store.injectReducers = jest.fn();
	store.injectEpics = jest.fn();
	store.removeReducers = jest.fn();
	store.removeEpics = jest.fn();

	beforeEach(() => {
		jest.resetAllMocks();
		withRedux.counter = 0;
	});

	it('injects suffixed reducers and epics', () => {
		const Root = withRedux({
			reducers: { test: R.identity },
			epics: { test: R.identity },
		})(() => null);

		mount(
			<Provider store={store}>
				<WidgetContext.Provider value={{ namespace: 'foo' }}>
					<Root />
				</WidgetContext.Provider>
			</Provider>
		);

		expect(store.injectReducers).toHaveBeenCalledWith(
			{ [`test${SUFFIX_DELIMITER}0`]: R.identity },
			'foo'
		);

		expect(store.injectEpics).toHaveBeenCalledWith(
			{ [`test${SUFFIX_DELIMITER}0`]: R.identity },
			'foo'
		);
	});

	it('removes suffixed reducers and epics upon unmounting', () => {
		const Root = withRedux({
			reducers: { test: R.identity },
			epics: { test: R.identity },
		})(() => null);

		const wrapper = mount(
			<Provider store={store}>
				<WidgetContext.Provider value={{ namespace: 'foo' }}>
					<Root />
				</WidgetContext.Provider>
			</Provider>
		);

		wrapper.unmount();

		expect(store.removeReducers).toHaveBeenCalledWith(
			[`test${SUFFIX_DELIMITER}0`],
			'foo'
		);
		expect(store.removeEpics).toHaveBeenCalledWith([
			`test${SUFFIX_DELIMITER}0`,
		]);
	});

	it('does not remove reducers when persistReducers is passed', () => {
		const Root = withRedux({
			reducers: { test: R.identity },
			persistReducers: true,
		})(() => null);
		const wrapper = mount(
			<Provider store={store}>
				<WidgetContext.Provider value={{ namespace: 'foo' }}>
					<Root />
				</WidgetContext.Provider>
			</Provider>
		);

		wrapper.unmount();
		expect(store.removeReducers).not.toHaveBeenCalled();
	});

	it('does not pass namespace if global is passed', () => {
		const Root = withRedux({
			reducers: { test: R.identity },
			epics: { test: R.identity },
			global: true,
		})(() => null);

		const wrapper = mount(
			<Provider store={store}>
				<WidgetContext.Provider value={{ namespace: 'foo' }}>
					<Root />
				</WidgetContext.Provider>
			</Provider>
		);

		expect(store.injectEpics).toHaveBeenCalledWith(
			{ [`test${SUFFIX_DELIMITER}0`]: R.identity },
			undefined
		);
		expect(store.injectReducers).toHaveBeenCalledWith(
			{ [`test${SUFFIX_DELIMITER}0`]: R.identity },
			undefined
		);

		wrapper.unmount();

		expect(store.removeReducers).toHaveBeenCalledWith(
			[`test${SUFFIX_DELIMITER}0`],
			undefined
		);
		expect(store.removeEpics).toHaveBeenCalledWith([
			`test${SUFFIX_DELIMITER}0`,
		]);
	});

	it('has a rising counter', () => {
		const Root = withRedux({
			reducers: { test: R.identity },
			persistReducers: true,
		})(() => null);
		const element = (
			<Provider store={store}>
				<WidgetContext.Provider value={{ namespace: 'foo' }}>
					<Root />
				</WidgetContext.Provider>
			</Provider>
		);

		mount(element);
		mount(element);
		expect(withRedux.counter).toBe(2);
	});
});
