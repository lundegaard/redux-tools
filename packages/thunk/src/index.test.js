import { createStore, applyMiddleware } from 'redux';
import { identity } from 'ramda';

import { attachNamespace, getNamespaceByAction } from '@redux-tools/namespaces';

import thunkMiddleware from './index';

describe('thunkMiddleware', () => {
	const listener = jest.fn();

	const listenerMiddleware = () => next => action => {
		listener(action);
		next(action);
	};

	const store = createStore(identity, applyMiddleware(thunkMiddleware, listenerMiddleware));

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('lets objects through', () => {
		const action = { type: 'BEARS' };
		store.dispatch(action);
		expect(listener).toHaveBeenCalledWith(action);
	});

	it('handles thunks without a namespace', () => {
		const action = { type: 'BEETS' };

		store.dispatch(({ dispatch }) => {
			dispatch(action);
		});

		expect(listener).toHaveBeenCalledWith(action);
	});

	it('handles thunks with a namespace', () => {
		const action = { type: 'BATTLESTAR_GALACTICA' };

		store.dispatch(
			attachNamespace('MICHAEL', ({ dispatch }) => {
				dispatch(action);
			})
		);

		expect(listener).toHaveBeenCalledTimes(1);
		expect(listener.mock.calls[0][0].type).toEqual(action.type);
		expect(getNamespaceByAction(listener.mock.calls[0][0])).toEqual('MICHAEL');
	});
});
