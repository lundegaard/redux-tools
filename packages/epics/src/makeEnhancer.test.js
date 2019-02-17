import { Subject } from 'rxjs';
import makeEnhancer from './makeEnhancer';
import { epicsInjected, epicsEjected } from './actions';

const createStore = jest.fn(() => ({ dispatch: jest.fn() }));
const epicMiddleware = { run: jest.fn() };
let store;

jest.mock('rxjs');
jest.mock('./makeRootEpic', () => () => 'rootEpicImpl');

describe('makeEnhancer', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		store = makeEnhancer({ epicMiddleware })(createStore)();
	});

	it('returns a Redux store with defined functions', () => {
		expect(store.injectEpics).toBeInstanceOf(Function);
		expect(store.ejectEpics).toBeInstanceOf(Function);
	});

	it('calls inject$.next under the hood when injectEpics is called', () => {
		const epic = jest.fn();
		store.injectEpics({ epic }, { namespace: 'ns', version: 1 });
		const inject$ = Subject.mock.instances[0];
		expect(inject$.next).toHaveBeenCalledTimes(1);
		expect(inject$.next.mock.calls[0][0]).toEqual({
			key: 'epic',
			value: epic,
			namespace: 'ns',
			version: 1,
			feature: 'namespaces',
		});
	});

	it('dispatches an action when injectEpics is called', () => {
		const epic = jest.fn();
		store.injectEpics({ epic }, { namespace: 'ns', version: 1 });
		expect(store.dispatch).toHaveBeenCalledWith(
			epicsInjected({ epics: ['epic'], namespace: 'ns', version: 1, feature: 'namespaces' })
		);
	});

	it('calls eject$.next under the hood when ejectEpics is called', () => {
		const epic = jest.fn();
		store.ejectEpics({ epic }, { namespace: 'ns', version: 1 });
		const eject$ = Subject.mock.instances[1];
		expect(eject$.next).toHaveBeenCalledTimes(1);
		expect(eject$.next.mock.calls[0][0]).toEqual({
			key: 'epic',
			value: epic,
			namespace: 'ns',
			version: 1,
			feature: 'namespaces',
		});
	});

	it('dispatches an action when ejectEpics is called', () => {
		const epic = jest.fn();
		store.ejectEpics({ epic }, { namespace: 'ns', version: 1 });
		expect(store.dispatch).toHaveBeenCalledWith(
			epicsEjected({ epics: ['epic'], namespace: 'ns', version: 1, feature: 'namespaces' })
		);
	});

	it('runs the rootEpic in the supplied middleware', () => {
		expect(epicMiddleware.run).toHaveBeenCalledWith('rootEpicImpl');
	});
});
