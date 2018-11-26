import isEntryIncludedTimes from './isEntryIncludedTimes';

/**
 * Returns whether an entry is NOT included in an array of entries, ignoring version.
 *
 * @param {Object[]} entries entries to search through
 * @param {Object} entry entry to search for
 * @returns {boolean} whether the entry is NOT included
 */
const isEntryNotIncluded = isEntryIncludedTimes(0);

export default isEntryNotIncluded;
