import { path } from 'ramda';

/**
 * Returns the feature of an action.
 *
 * @param {Object} action Redux action
 * @returns {?string} feature of the action
 */
const getFeatureByAction = path(['meta', 'feature']);

export default getFeatureByAction;
