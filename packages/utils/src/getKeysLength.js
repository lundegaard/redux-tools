import { o, length, keys } from 'ramda';

/**
 * Returns a number of object keys.
 *
 * @param {Object} source object
 * @returns {number} number of object keys
 */
const getKeysLength = o(length, keys);

export default getKeysLength;
