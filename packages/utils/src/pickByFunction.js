import { pickBy } from 'ramda';
import { isFunction } from 'ramda-extension';

/**
 * Returns a partial copy of an object containing only the keys that satisfy the supplied predicate.
 *
 * @param {Object} from source object
 * @returns {Object} object new object containing only functions
 */
const pickByFunction = pickBy(isFunction);

export default pickByFunction;
