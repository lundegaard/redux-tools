import { curry, mergeDeepRight } from 'ramda';

/**
 * Associates an action with a feature.
 *
 * @param {?string} feature feature to attach
 * @param {Object} action action to add the feature to
 */
const attachFeature = curry((feature, action) =>
	feature ? mergeDeepRight({ meta: { feature } }, action) : action
);

export default attachFeature;
