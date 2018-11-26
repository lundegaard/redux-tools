import { prop, unless, both, always } from 'ramda';
import { isString, isNotEmpty, dispatch } from 'ramda-extension';

/**
 * Returns the display name of a React component, falling back appropriately.
 *
 * @param {React.Component} Component React component to get the name of
 * @returns {string}
 */
export default dispatch([
	prop('displayName'),
	prop('name'),
	unless(both(isString, isNotEmpty), always('Component')),
]);
