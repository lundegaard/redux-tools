import React from 'react';
import * as R from 'ramda';
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

// eslint-disable-next-line react/display-name
const withBarNamespace = Component => props => <Component {...props} namespace="bar" />;

describe('wrapMapStateToProps', () => {
	it('gets correct state slice', () => {
		const mapStateToProps = wrapMapStateToProps(R.identity);
		expect(mapStateToProps(state, { namespace: 'foo' })).toEqual({ value: 'Foo' });
	});

	it('applies passed mapStateToProps', () => {
		const mapStateToProps = wrapMapStateToProps(R.prop('qux'));
		expect(mapStateToProps(state, { namespace: 'bar' })).toEqual({ value: 'Qux' });
	});

	it('returns an object when mapStateToProps is undefined', () => {
		const mapStateToProps = wrapMapStateToProps(null);
		expect(mapStateToProps(state, { namespace: 'foo' })).toEqual({});
	});
});

describe('wrapMapDispatchToProps', () => {
	it('handles an object', () => {
		const mapDispatchToProps = wrapMapDispatchToProps({
			actionCreator: R.always({ type: 'TEST' }),
		});

		const dispatch = jest.fn();

		const { actionCreator } = mapDispatchToProps(dispatch, { namespace: 'foo' });
		actionCreator();
		expect(dispatch).toHaveBeenCalledWith({ type: 'TEST', meta: { namespace: 'foo' } });
	});

	it('handles a function', () => {
		const mapDispatchToProps = wrapMapDispatchToProps(dispatch => ({
			actionCreator: () => dispatch({ type: 'TEST' }),
		}));

		const dispatch = jest.fn();

		const { actionCreator } = mapDispatchToProps(dispatch, { namespace: 'foo' });
		actionCreator();
		expect(dispatch).toHaveBeenCalledWith({ type: 'TEST', meta: { namespace: 'foo' } });
	});

	it('handles nil', () => {
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
	it('applies mapStateToProps', () => {
		const connector = namespacedConnect(R.identity);
		const store = createStore(R.always(state));

		const Root = R_.noop;
		const ConnectedRoot = connector(Root);

		const wrapper = mount(
			<Provider value={{ store, withNamespace: withBarNamespace }}>
				<ConnectedRoot />
			</Provider>
		);

		expect(wrapper.find(Root).prop('qux')).toEqual({ value: 'Qux' });
	});

	it('applies mapDispatchToProps', () => {
		const connector = namespacedConnect(undefined, { actionCreator: R.always({ type: 'TEST' }) });

		const store = createStore(R.always(state));
		store.dispatch = jest.fn();

		const Root = R_.noop;
		const ConnectedRoot = connector(Root);

		const wrapper = mount(
			<Provider value={{ store, withNamespace: withBarNamespace }}>
				<ConnectedRoot />
			</Provider>
		);

		wrapper.find(Root).prop('actionCreator')();
		expect(store.dispatch).toHaveBeenCalledWith({ type: 'TEST', meta: { namespace: 'bar' } });
	});
});
