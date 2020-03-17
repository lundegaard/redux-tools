import React from 'react';
import { always } from 'ramda';
import { alwaysNull } from 'ramda-extension';
import { mount } from 'enzyme';

import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import { NamespaceContext } from './contexts';
import useNamespace from './useNamespace';

const Test = ({ children }) => {
	children();

	return null;
};

const alwaysFoo = always('foo');

describe('useNamespace', () => {
	it('returns namespace from context', () => {
		let namespace;

		mount(
			<NamespaceContext.Provider value={{ namespaces: { foo: 'bar' }, useNamespace: alwaysFoo }}>
				<Test>{() => (namespace = useNamespace('foo'))}</Test>
			</NamespaceContext.Provider>
		);

		expect(namespace).toEqual('bar');
	});

	it('returns namespace from `useNamespace` if context does not contain feature', () => {
		let namespace;

		mount(
			<NamespaceContext.Provider value={{ namespaces: { foo: 'bar' }, useNamespace: alwaysFoo }}>
				<Test>{() => (namespace = useNamespace('random'))}</Test>
			</NamespaceContext.Provider>
		);

		expect(namespace).toEqual('foo');
	});

	it('falls back to default namespace if everything fails', () => {
		let namespace;

		mount(
			<NamespaceContext.Provider
				value={{ namespaces: { [DEFAULT_FEATURE]: 'baz' }, useNamespace: alwaysNull }}
			>
				<Test>{() => (namespace = useNamespace('random'))}</Test>
			</NamespaceContext.Provider>
		);

		expect(namespace).toEqual('baz');
	});
});
