import React, { Component } from 'react';
import { omit } from 'ramda';
import PropTypes from 'prop-types';
import { getDisplayName } from '@redux-tools/utils';

import withInjectorContext from './withInjectorContext';

let counter = 0;
makeInjector.resetCounter = () => (counter = 0);

const omitStore = omit(['store']);

export default function makeInjector(inject, eject) {
	return (injectables, { persist, global, ...injectionProps } = {}) => NextComponent => {
		class Injector extends Component {
			static propTypes = {
				namespace: PropTypes.string,
				store: PropTypes.object.isRequired,
			};

			static displayName = `Injector(${getDisplayName(NextComponent)})`;

			constructor(props) {
				super(props);

				this.namespace = global ? null : props.namespace;
				this.version = counter++;

				inject(props.store)(injectables, {
					namespace: this.namespace,
					version: this.version,
					...injectionProps,
				});
			}

			componentWillUnmount() {
				const { store } = this.props;

				if (!persist) {
					eject(store)(injectables, {
						namespace: this.namespace,
						version: this.version,
						...injectionProps,
					});
				}
			}

			render() {
				return <NextComponent {...omitStore(this.props)} />;
			}
		}

		return withInjectorContext(Injector);
	};
}
