import { o, filter, curry } from 'ramda';
import { equalsLength } from 'ramda-extension';

import areEntriesEqual from './areEntriesEqual';

/**
 * Returns whether an entry is included exactly N times in an array of entries, ignoring version.
 *
 * @param {number} times how many times the entry must be included
 * @param {Object[]} entries entries to search through
 * @param {Object} entry entry to search for
 * @returns {boolean} whether the entry is included exactly N times
 */
const isEntryIncludedTimes = curry((times, entries, entry) =>
	o(equalsLength(times), filter(areEntriesEqual(entry)))(entries)
);

export default isEntryIncludedTimes;
