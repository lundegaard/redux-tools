import { complement } from 'nanoutils';
import isEntryNotIncluded from './isEntryNotIncluded';

/**
 * Returns whether an entry is included in an array of entries, ignoring version.
 *
 * @param {Object[]} entries entries to search through
 * @param {Object} entry entry to search for
 * @returns {boolean} whether the entry is included
 */
const isEntryIncluded = complement(isEntryNotIncluded);

export default isEntryIncluded;
