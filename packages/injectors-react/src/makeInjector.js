import React, { Component } from 'react';
import { omit, keys, o } from 'ramda';
import PropTypes from 'prop-types';
import { getDisplayName } from '@redux-tools/utils';

import withSuffixing from './withSuffixing';
import withInjectorContext from './withInjectorContext';

const filterProps = omit(['suffixKeys', 'store']);

export default function makeInjector(inject, remove) {
	return (injectables, { persist, global } = {}) => NextComponent => {
		class Injector extends Component {
			static propTypes = {
				namespace: PropTypes.string,
				store: PropTypes.object.isRequired,
				suffixKeys: PropTypes.func.isRequired,
			};

			static displayName = `Injector(${getDisplayName(NextComponent)})`;

			constructor(props) {
				super(props);

				// TODO: Refactor to allow changes over time in namespace and injectables
				this.injectables = props.suffixKeys(injectables);
				this.namespace = global ? null : props.namespace;

				inject(props.store)(this.injectables, this.namespace);
			}

			componentWillUnmount() {
				if (!persist) {
					remove(this.props.store)(keys(this.injectables), this.namespace);
				}
			}

			render() {
				return <NextComponent {...filterProps(this.props)} />;
			}
		}

		return o(withSuffixing, withInjectorContext)(Injector);
	};
}
