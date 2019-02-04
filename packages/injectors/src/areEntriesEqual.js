import { omit, useWith, equals } from 'nanoutils';

const omitTemporalKeys = omit(['version']);

/**
 * Returns whether the entries are equal, ignoring the version.
 *
 * @param {Object} entry1 first entry
 * @param {Object} entry2 second entry
 * @returns {boolean} whether the entries are equal
 */
const areEntriesEqual = useWith(equals, [omitTemporalKeys, omitTemporalKeys]);

export default areEntriesEqual;
