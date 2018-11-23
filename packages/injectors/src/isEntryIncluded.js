import { complement } from 'ramda';
import isEntryIncludedTimes from './isEntryIncludedTimes';

/**
 * Returns whether an entry is included in an array of entries, ignoring version.
 *
 * @param {Object[]} entries entries to search through
 * @param {Object} entry entry to search for
 * @returns {boolean} whether the entry is included
 */
const isEntryIncluded = complement(isEntryIncludedTimes(0));

export default isEntryIncluded;
