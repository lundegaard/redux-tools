import { curry, isNil, prop } from 'nanoutils';

const getVersion = prop('version');

/**
 * Returns whether the version of a tested entry is not higher than the reference version.
 *
 * @param {?number} referenceVersion version to compare against
 * @param {Object} testedEntry entry to test
 * @returns {boolean} whether the version can be ejected
 */
const isEntryEjectableByVersion = curry((referenceVersion, testedEntry) => {
	const testedVersion = getVersion(testedEntry);

	if (isNil(referenceVersion) && isNil(testedVersion)) {
		return true;
	}

	if (isNil(referenceVersion) || isNil(testedVersion)) {
		return false;
	}

	return testedVersion <= referenceVersion;
});

export default isEntryEjectableByVersion;
