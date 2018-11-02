import { Subject } from 'rxjs';
import enhancer from './enhancer';
import { stopEpics } from './actions';

const createStore = jest.fn(() => ({ dispatch: jest.fn() }));
const epicMiddleware = { run: jest.fn() };
let store;

jest.mock('rxjs');
jest.mock('./makeRootEpic', () => () => 'rootEpicImpl');

describe('enhancer', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		store = enhancer({ epicMiddleware })(createStore)();
	});

	it('returns a Redux store with defined functions', () => {
		expect(store.injectEpics).toBeInstanceOf(Function);
		expect(store.removeEpics).toBeInstanceOf(Function);
	});

	it('calls epic$.next under the hood when injectEpics is called', () => {
		const epic1 = jest.fn();
		const epic2 = jest.fn();
		store.injectEpics({ epic1 });
		store.injectEpics({ epic2 }, 'ns');
		const epic$ = Subject.mock.instances[0];
		expect(epic$.next).toHaveBeenCalledTimes(2);
		expect(epic$.next.mock.calls[0][0]).toEqual({ epic: epic1, id: 'epic1' });
		expect(epic$.next.mock.calls[1][0]).toEqual({ epic: epic2, id: 'epic2', namespace: 'ns' });
	});

	it('runs the rootEpic in the supplied middleware', () => {
		expect(epicMiddleware.run).toHaveBeenCalledWith('rootEpicImpl');
	});

	it('dispatches an action when removeEpics is called', () => {
		store.removeEpics(['yoEpic']);
		expect(store.dispatch).toHaveBeenCalledWith(stopEpics(['yoEpic']));
	});
});
