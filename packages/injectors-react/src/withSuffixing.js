import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { join, o, map, when } from 'ramda';
import { mapKeys, isPlainObject } from 'ramda-extension';
import { getDisplayName } from '@redux-tools/utils';

let counter = 0;
withSuffixing.resetCounter = () => (counter = 0);

const suffix = id => value => join('@', [value, id]);

/**
 * This HOC is necessary because if a container is remounted for any reason,
 * the `componentWillUnmount` lifecycle hook is invoked AFTER the constructor of the new
 * element. This would cause the reducers to be ejected and not injected back.
 *
 * `->` is constructor of the second instance and `=>` is CWU of the first one
 * BEFORE: [reducer] -> [reducer] => [], no reducer survives the remounting process
 * AFTER: [reducer1] -> [reducer1, reducer2] => [reducer2], the second reducer survives
 *
 * @param {React.Component} NextComponent component to wrap
 * @returns {React.Component} component with a bound `suffixKeys` prop
 */
export default function withSuffixing(NextComponent) {
	class WithSuffixing extends Component {
		static propTypes = {
			namespace: PropTypes.string,
		};

		static displayName = `WithSuffixing(${getDisplayName(NextComponent)})`;

		id = counter++;

		suffixKeys = o(
			map(when(isPlainObject, object => this.suffixKeys(object))),
			mapKeys(suffix(this.id))
		);

		render() {
			return <NextComponent suffixKeys={this.suffixKeys} {...this.props} />;
		}
	}

	return WithSuffixing;
}
