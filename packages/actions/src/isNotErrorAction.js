import { complement } from 'nanoutils';
import isErrorAction from './isErrorAction';

/**
 * Returns whether the action is NOT an error action.
 *
 * @param {Object} action Redux action
 * @returns {boolean}
 */
export default complement(isErrorAction);
