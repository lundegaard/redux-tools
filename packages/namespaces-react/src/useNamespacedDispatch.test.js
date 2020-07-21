import { mount } from 'enzyme';
import React from 'react';

import NamespaceProvider from './NamespaceProvider';
import useNamespacedDispatch from './useNamespacedDispatch';

const Test = ({ children }) => {
	children();

	return null;
};

const mockDispatch = jest.fn();

const action = { type: 'FOO' };

jest.mock('react-redux', () => ({ useDispatch: () => mockDispatch }));

describe('useNamespacedDispatch', () => {
	beforeEach(() => jest.resetAllMocks());

	it('attaches namespace found in context under the default feature', () => {
		mount(
			<NamespaceProvider namespace="foo">
				<Test>
					{() => {
						const dispatch = useNamespacedDispatch();

						dispatch(action);
					}}
				</Test>
			</NamespaceProvider>
		);

		expect(mockDispatch).toHaveBeenCalledTimes(1);
		expect(mockDispatch.mock.calls[0][0]).toEqual({ ...action, meta: { namespace: 'foo' } });
	});

	it('attaches namespace found in context under a specified feature', () => {
		mount(
			<NamespaceProvider namespace="foo" feature="bar">
				<Test>
					{() => {
						const dispatch = useNamespacedDispatch({ feature: 'bar' });

						dispatch(action);
					}}
				</Test>
			</NamespaceProvider>
		);

		expect(mockDispatch).toHaveBeenCalledTimes(1);
		expect(mockDispatch.mock.calls[0][0]).toEqual({ ...action, meta: { namespace: 'foo' } });
	});

	it('does not attach namespace if no could be found in context', () => {
		mount(
			<Test>
				{() => {
					const dispatch = useNamespacedDispatch({ feature: 'qux' });

					dispatch(action);
				}}
			</Test>
		);

		expect(mockDispatch).toHaveBeenCalledTimes(1);
		expect(mockDispatch.mock.calls[0][0]).toBe(action);
	});

	it('prefers static namespace to one found in context', () => {
		mount(
			<NamespaceProvider namespace="foo">
				<Test>
					{() => {
						const dispatch = useNamespacedDispatch({ namespace: 'bar' });

						dispatch(action);
					}}
				</Test>
			</NamespaceProvider>
		);

		expect(mockDispatch).toHaveBeenCalledTimes(1);
		expect(mockDispatch.mock.calls[0][0]).toEqual({ ...action, meta: { namespace: 'bar' } });
	});
});
