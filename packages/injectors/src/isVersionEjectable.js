import { curry } from 'ramda';
import { isNotNil } from 'ramda-extension';

/**
 * Returns whether the tested version is not higher than the reference version.
 *
 * @param {?number} referenceVersion version to compare against
 * @param {?number} testedVersion version to test
 * @returns {boolean} whether the version can be ejected
 */
const isVersionEjectable = curry(
	(referenceVersion, testedVersion) =>
		isNotNil(referenceVersion) && isNotNil(testedVersion) && testedVersion <= referenceVersion
);

export default isVersionEjectable;
