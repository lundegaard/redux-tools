import { stopEpics, reducersInjected, reducersRemoved, ActionTypes } from './actions';

describe('action creators', () => {
	describe('stopEpics', () => {
		it('is a simple action creator', () => {
			expect(stopEpics({ foo: 'bar' }).payload).toEqual({ foo: 'bar' });
		});
	});

	describe('reducersInjected', () => {
		it('is a simple action creator', () => {
			expect(reducersInjected({ foo: 'bar' }).payload).toEqual({ foo: 'bar' });
		});
	});

	describe('reducersRemoved', () => {
		it('is a simple action creator', () => {
			expect(reducersRemoved({ foo: 'bar' }).payload).toEqual({ foo: 'bar' });
		});
	});
});

describe('ActionTypes', () => {
	it('is exported and is an object', () => {
		expect(ActionTypes).toBeInstanceOf(Object);
	});
});
