import React from 'react';
import { always } from 'ramda';
import { alwaysNull } from 'ramda-extension';
import { mount } from 'enzyme';
import { DEFAULT_FEATURE } from '@redux-tools/namespaces';

import useInjectorContext from './useInjectorContext';
import { InjectorContext } from './contexts';

const Test = ({ children }) => {
	children();
	return null;
};

const alwaysFoo = always('foo');

describe('useInjectorContext', () => {
	it('passes down context values', () => {
		let injectorContext;

		mount(
			<InjectorContext.Provider
				value={{
					namespaces: { foo: 'bar' },
					useNamespace: alwaysFoo,
					store: {},
				}}
			>
				<Test>{() => (injectorContext = useInjectorContext('foo'))}</Test>
			</InjectorContext.Provider>
		);

		expect(injectorContext.namespaces).toEqual({ foo: 'bar' });
		expect(injectorContext.useNamespace).toEqual(alwaysFoo);
		expect(injectorContext.store).toEqual({});
	});

	it('returns namespace from context', () => {
		let injectorContext;

		mount(
			<InjectorContext.Provider value={{ namespaces: { foo: 'bar' }, useNamespace: alwaysFoo }}>
				<Test>{() => (injectorContext = useInjectorContext('foo'))}</Test>
			</InjectorContext.Provider>
		);

		expect(injectorContext.namespace).toEqual('bar');
	});

	it('returns namespace from `useNamespace` if context does not contain feature', () => {
		let injectorContext;

		mount(
			<InjectorContext.Provider value={{ namespaces: { foo: 'bar' }, useNamespace: alwaysFoo }}>
				<Test>{() => (injectorContext = useInjectorContext('random'))}</Test>
			</InjectorContext.Provider>
		);

		expect(injectorContext.namespace).toEqual('foo');
	});

	it('falls back to default namespace if everything fails', () => {
		let injectorContext;

		mount(
			<InjectorContext.Provider
				value={{ namespaces: { [DEFAULT_FEATURE]: 'baz' }, useNamespace: alwaysNull }}
			>
				<Test>{() => (injectorContext = useInjectorContext('random'))}</Test>
			</InjectorContext.Provider>
		);

		expect(injectorContext.namespace).toEqual('baz');
	});
});
