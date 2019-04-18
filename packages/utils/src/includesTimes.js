import { o, filter, curry, equals } from 'ramda';
import { equalsLength } from 'ramda-extension';

/**
 * Returns whether an element is included exactly N times in an array.
 *
 * @param {number} times how many times the element must be included
 * @param {Object[]} xs array to search through
 * @param {Object} x element to search for
 * @returns {boolean} whether the element is included exactly N times
 */
const includesTimes = curry((times, x, xs) => o(equalsLength(times), filter(equals(x)))(xs));

export default includesTimes;
