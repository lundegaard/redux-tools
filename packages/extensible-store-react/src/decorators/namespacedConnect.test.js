import React from 'react';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { WidgetContext } from 'react-union';

import namespacedConnect, {
	makeMapStateToProps,
	makeMapDispatchToProps,
} from './namespacedConnect';

const state = {
	namespaces: {
		foo: { value: 'Foo' },
		bar: { qux: { value: 'Qux' } },
	},
};

describe('makeMapStateToProps', () => {
	it('gets correct state slice', () => {
		const mapStateToProps = makeMapStateToProps(R.identity);
		expect(mapStateToProps(state, { namespace: 'foo' })).toEqual({
			value: 'Foo',
		});
	});

	it('applies passed mapStateToProps', () => {
		const mapStateToProps = makeMapStateToProps(R.prop('qux'));
		expect(mapStateToProps(state, { namespace: 'bar' })).toEqual({
			value: 'Qux',
		});
	});

	it('throws when namespace does not exist', () => {
		const mapStateToProps = makeMapStateToProps(R.identity);
		expect(() =>
			mapStateToProps(state, { namespace: 'klobása' })
		).toThrow();
	});

	it('does not barf when mapStateToProps is not passed', () => {
		const mapStateToProps = makeMapStateToProps(undefined);
		expect(mapStateToProps(state, { namespace: 'foo' })).toEqual({});
	});
});

describe('makeMapDispatchToProps', () => {
	it('handles an object', () => {
		const mapDispatchToProps = makeMapDispatchToProps({
			actionCreator: R.always({ type: 'TEST' }),
		});

		const dispatch = jest.fn();

		const { actionCreator } = mapDispatchToProps(dispatch, {
			namespace: 'foo',
		});
		actionCreator();
		expect(dispatch).toHaveBeenCalledWith({
			type: 'TEST',
			meta: { namespace: 'foo' },
		});
	});

	it('handles a function', () => {
		const mapDispatchToProps = makeMapDispatchToProps(dispatch => ({
			actionCreator: () => dispatch({ type: 'TEST' }),
		}));

		const dispatch = jest.fn();

		const { actionCreator } = mapDispatchToProps(dispatch, {
			namespace: 'foo',
		});
		actionCreator();
		expect(dispatch).toHaveBeenCalledWith({
			type: 'TEST',
			meta: { namespace: 'foo' },
		});
	});
});

describe('namespacedConnect', () => {
	it('applies mapStateToProps', () => {
		const connector = namespacedConnect(R.identity);
		const store = createStore(R.always(state));

		const Root = R_.noop;
		const ConnectedRoot = connector(Root);

		const wrapper = mount(
			<Provider store={store}>
				<WidgetContext.Provider value={{ namespace: 'bar' }}>
					<ConnectedRoot />
				</WidgetContext.Provider>
			</Provider>
		);

		expect(wrapper.find(Root).prop('qux')).toEqual({ value: 'Qux' });
	});

	it('applies mapDispatchToProps', () => {
		const connector = namespacedConnect(undefined, {
			actionCreator: R.always({ type: 'TEST' }),
		});

		const store = createStore(R.always(state));
		store.dispatch = jest.fn();

		const Root = R_.noop;
		const ConnectedRoot = connector(Root);

		const wrapper = mount(
			<Provider store={store}>
				<WidgetContext.Provider value={{ namespace: 'bar' }}>
					<ConnectedRoot />
				</WidgetContext.Provider>
			</Provider>
		);

		wrapper.find(Root).prop('actionCreator')();
		expect(store.dispatch).toHaveBeenCalledWith({
			type: 'TEST',
			meta: { namespace: 'bar' },
		});
	});
});
