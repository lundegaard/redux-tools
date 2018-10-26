import { curry, o, map, when, head, split } from 'ramda';
import { mapKeys, isPlainObject } from 'ramda-extension';

import { SUFFIX_DELIMITER } from '../constants';

const suffix = curry((id, value) => `${value}${SUFFIX_DELIMITER}${String(id)}`);

/**
 * Recursively suffixes all keys of an object with a delimiter and an ID.
 *
 * @param {String} id id to suffix the keys with
 * @param {Object} object object to suffix
 * @returns {Object} suffixed object
 */
export const suffixKeys = curry((id, object) =>
	o(
		// Prettier <3
		map(when(isPlainObject, innerObject => suffixKeys(id, innerObject))),
		mapKeys(suffix(id))
	)(object)
);

const removeSuffix = o(head, split(SUFFIX_DELIMITER));

/**
 * Attempts to recursively remove suffixes from all keys of an object.
 * If no suffix is present, the key will be skipped.
 *
 * @param {Object} object object to remove the suffixes from
 * @returns {Object} object with suffixes removed
 */
export const removeSuffixFromKeys = o(
	map(when(isPlainObject, object => removeSuffixFromKeys(object))),
	mapKeys(removeSuffix)
);
