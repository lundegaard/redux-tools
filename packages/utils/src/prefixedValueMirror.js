import { o, map, curry } from 'nanoutils';
import { valueMirror } from 'ramda-extension';

const addPrefix = prefix => map(x => `${prefix}/${x}`);

/**
 * Works just like `valueMirror` from ramda-extension, but prefixes each value.
 *
 * @param {string} prefix a string to prefix each value with
 * @param {Array} xs array of values to mirror as keys
 * @returns {Object} object with values set to `prefix/key`
 */
export default curry((prefix, xs) => o(addPrefix(prefix), valueMirror)(xs));
