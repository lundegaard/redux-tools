import { mount } from 'enzyme';
import React from 'react';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import NamespaceProvider from './NamespaceProvider';
import useNamespacedSelector from './useNamespacedSelector';

const Test = ({ children }) => {
	children();

	return null;
};

const mockState = {
	[DEFAULT_FEATURE]: {
		foo: { value: 1 },
	},
	someFeature: {
		bar: { value: 2 },
	},
};

jest.mock('react-redux', () => ({ useSelector: selector => selector(mockState) }));

describe('useNamespacedDispatch', () => {
	beforeEach(() => jest.resetAllMocks());

	it('accesses namespace found in context under the default feature', () => {
		let result;

		mount(
			<NamespaceProvider namespace="foo">
				<Test>{() => (result = useNamespacedSelector(state => state.value))}</Test>
			</NamespaceProvider>
		);

		expect(result).toBe(1);
	});

	it('accesses namespace found in context under a specified feature', () => {
		let result;

		mount(
			<NamespaceProvider namespace="bar" feature="someFeature">
				<Test>
					{() =>
						(result = useNamespacedSelector(state => state.value, undefined, {
							feature: 'someFeature',
						}))
					}
				</Test>
			</NamespaceProvider>
		);

		expect(result).toBe(2);
	});

	it('returns undefined if no namespace could be resolved', () => {
		let result;

		mount(<Test>{() => (result = useNamespacedSelector(state => state))}</Test>);

		expect(result).toBe(undefined);
	});

	it('prefers static namespace to one found in context', () => {
		let result;

		mount(
			<NamespaceProvider namespace="bar">
				<Test>
					{() =>
						(result = useNamespacedSelector(state => state.value, undefined, {
							namespace: 'foo',
						}))
					}
				</Test>
			</NamespaceProvider>
		);

		expect(result).toBe(1);
	});
});
