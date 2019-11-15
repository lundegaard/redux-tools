import { createStore } from 'redux';
import combineReducers from './combineReducers';

describe('Utils', () => {
	describe('combineReducers', () => {
		it('returns a composite reducer that maps the state keys to given reducers', () => {
			const reducer = combineReducers({
				counter: (state = 0, action) => (action.type === 'increment' ? state + 1 : state),
				stack: (state = [], action) => (action.type === 'push' ? [...state, action.value] : state),
			});
			const s1 = reducer(undefined, { type: 'increment' });
			expect(s1).toEqual({ counter: 1, stack: [] });
			const s2 = reducer(s1, { type: 'push', value: 'a' });
			expect(s2).toEqual({ counter: 1, stack: ['a'] });
		});
		it('ignores all props which are not a function', () => {
			// we double-cast because these conditions can only happen in a javascript setting
			const reducer = combineReducers({
				fake: true,
				broken: 'string',
				another: { nested: 'object' },
				stack: (state = []) => state,
			});
			expect(Object.keys(reducer(undefined, { type: 'push' }))).toEqual(['stack']);
		});
		it('allows a symbol to be used as an action type', () => {
			const increment = Symbol('INCREMENT');
			const reducer = combineReducers({
				counter(state = 0, action) {
					switch (action.type) {
						case increment:
							return state + 1;
						default:
							return state;
					}
				},
			});
			expect(reducer({ counter: 0 }, { type: increment }).counter).toEqual(1);
		});
		it('maintains referential equality if the reducers it is combining do', () => {
			const reducer = combineReducers({
				child1(state = {}) {
					return state;
				},
				child2(state = {}) {
					return state;
				},
				child3(state = {}) {
					return state;
				},
			});
			const initialState = reducer(undefined, { type: '@@INIT' });
			expect(reducer(initialState, { type: 'FOO' })).toBe(initialState);
		});
		it('does not have referential equality if one of the reducers changes something', () => {
			const reducer = combineReducers({
				child1(state = {}) {
					return state;
				},
				child2(state = { count: 0 }, action) {
					switch (action.type) {
						case 'increment':
							return { count: state.count + 1 };
						default:
							return state;
					}
				},
				child3(state = {}) {
					return state;
				},
			});
			const initialState = reducer(undefined, { type: '@@INIT' });
			expect(reducer(initialState, { type: 'increment' })).not.toBe(initialState);
		});
		describe('With Replace Reducers', function() {
			const foo = (state = {}) => state;
			const bar = (state = {}) => state;
			const ACTION = { type: 'ACTION' };
			it('should return an updated state when additional reducers are passed to combineReducers', function() {
				const originalCompositeReducer = combineReducers({ foo });
				const store = createStore(originalCompositeReducer);
				store.dispatch(ACTION);
				const initialState = store.getState();
				store.replaceReducer(combineReducers({ foo, bar }));
				store.dispatch(ACTION);
				const nextState = store.getState();
				expect(nextState).not.toBe(initialState);
			});
			it('should return an updated state when reducers passed to combineReducers are changed', function() {
				const baz = (state = {}) => state;
				const originalCompositeReducer = combineReducers({ foo, bar });
				const store = createStore(originalCompositeReducer);
				store.dispatch(ACTION);
				const initialState = store.getState();
				store.replaceReducer(combineReducers({ baz, bar }));
				store.dispatch(ACTION);
				const nextState = store.getState();
				expect(nextState).not.toBe(initialState);
			});
			it('should return the same state when reducers passed to combineReducers not changed', function() {
				const originalCompositeReducer = combineReducers({ foo, bar });
				const store = createStore(originalCompositeReducer);
				store.dispatch(ACTION);
				const initialState = store.getState();
				store.replaceReducer(combineReducers({ foo, bar }));
				store.dispatch(ACTION);
				const nextState = store.getState();
				expect(nextState).toBe(initialState);
			});
			it(
				'should return an updated state when one of more reducers ' +
					'passed to the combineReducers are removed',
				function() {
					const originalCompositeReducer = combineReducers({ foo, bar });
					const store = createStore(originalCompositeReducer);
					store.dispatch(ACTION);
					const initialState = store.getState();
					store.replaceReducer(combineReducers({ bar }));
					const nextState = store.getState();
					expect(nextState).not.toBe(initialState);
				}
			);
		});
	});
});
