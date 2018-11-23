import { curry, isNil } from 'ramda';

/**
 * Returns whether the tested version is not higher than the reference version.
 *
 * @param {?number} referenceVersion version to compare against
 * @param {?number} testedVersion version to test
 * @returns {boolean} whether the version can be ejected
 */
const isVersionEjectable = curry((referenceVersion, testedVersion) => {
	if (isNil(referenceVersion) && isNil(testedVersion)) {
		return true;
	}

	if (isNil(referenceVersion) || isNil(testedVersion)) {
		return false;
	}

	return testedVersion <= referenceVersion;
});

export default isVersionEjectable;
