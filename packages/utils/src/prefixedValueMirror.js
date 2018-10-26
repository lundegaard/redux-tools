import { o, map, curry } from 'ramda';
import { valueMirror } from 'ramda-extension';

const addPrefix = prefix => map(x => `${prefix}/${x}`);

/**
 * @example
 *
 * 	 prefixedValueMirror("ns", ["ACTION", "REACTION"])
 *   // { ACTION: "ns/ACTION", REACTION: "ns/REACTION" }
 *
 */
export default curry((prefix, xs) => o(addPrefix(prefix), valueMirror)(xs));
