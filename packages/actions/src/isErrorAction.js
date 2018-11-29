import { propEq } from 'ramda';

/**
 * Returns whether the action is an error action or not.
 *
 * @param {Object} action Redux action
 * @returns {boolean}
 */
export default propEq('error', true);
