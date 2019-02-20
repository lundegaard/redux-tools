import React from 'react';
import * as NU from 'nanoutils';
import * as R_ from 'ramda-extension';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from '@redux-tools/injectors-react';

import namespacedConnect, {
	wrapMapStateToProps,
	wrapMapDispatchToProps,
} from './namespacedConnect';

const state = {
	namespaces: {
		foo: { value: 'Foo' },
		bar: { qux: { value: 'Qux' } },
	},
};

describe('wrapMapStateToProps', () => {
	it('gets correct state slice', () => {
		const mapStateToProps = wrapMapStateToProps(NU.identity);
		expect(mapStateToProps(state, { namespace: 'foo' })).toEqual({ value: 'Foo' });
	});

	it('applies passed mapStateToProps', () => {
		const mapStateToProps = wrapMapStateToProps(NU.prop('qux'));
		expect(mapStateToProps(state, { namespace: 'bar' })).toEqual({ value: 'Qux' });
	});

	it('returns an object when mapStateToProps is undefined', () => {
		const mapStateToProps = wrapMapStateToProps(null);
		expect(mapStateToProps(state, { namespace: 'foo' })).toEqual({});
	});
});

describe('wrapMapDispatchToProps', () => {
	// TODO: fix it
	it.skip('handles an object', () => {
		const mapDispatchToProps = wrapMapDispatchToProps({
			actionCreator: NU.always({ type: 'TEST' }),
		});

		const dispatch = jest.fn();

		const { actionCreator } = mapDispatchToProps(dispatch, { namespace: 'foo' });
		actionCreator();
		expect(dispatch).toHaveBeenCalledWith({ type: 'TEST', meta: { namespace: 'foo' } });
	});

	// TODO: fix it
	it.skip('handles a function', () => {
		const mapDispatchToProps = wrapMapDispatchToProps(dispatch => ({
			actionCreator: () => dispatch({ type: 'TEST' }),
		}));

		const dispatch = jest.fn();

		const { actionCreator } = mapDispatchToProps(dispatch, { namespace: 'foo' });
		actionCreator();
		expect(dispatch).toHaveBeenCalledWith({ type: 'TEST', meta: { namespace: 'foo' } });
	});

	// TODO: fix it
	it.skip('handles nil', () => {
		const mapDispatchToProps = wrapMapDispatchToProps(null);
		const dispatch = jest.fn();
		const props = mapDispatchToProps(dispatch, { namespace: 'foo' });
		expect(props).toEqual({});
	});

	it('throws when an unsupported type is received', () => {
		const mapDispatchToProps = wrapMapDispatchToProps('what am i');
		const dispatch = jest.fn();
		expect(() => mapDispatchToProps(dispatch, { namespace: 'foo' })).toThrow();
	});
});

describe('namespacedConnect', () => {
	// TODO: fix it
	it.skip('applies mapStateToProps', () => {
		const connector = namespacedConnect(NU.identity);
		const store = createStore(NU.always(state));

		const Root = R_.noop;
		const ConnectedRoot = connector(Root);

		const wrapper = mount(
			<Provider store={store} namespace="bar">
				<ConnectedRoot />
			</Provider>
		);

		expect(wrapper.find(Root).prop('qux')).toEqual({ value: 'Qux' });
	});

	// TODO: fix it
	it.skip('applies mapDispatchToProps', () => {
		const connector = namespacedConnect(undefined, { actionCreator: NU.always({ type: 'TEST' }) });

		const store = createStore(NU.always(state));
		store.dispatch = jest.fn();

		const Root = R_.noop;
		const ConnectedRoot = connector(Root);

		const wrapper = mount(
			<Provider store={store} namespace="bar">
				<ConnectedRoot />
			</Provider>
		);

		wrapper.find(Root).prop('actionCreator')();
		expect(store.dispatch).toHaveBeenCalledWith({ type: 'TEST', meta: { namespace: 'bar' } });
	});
});
