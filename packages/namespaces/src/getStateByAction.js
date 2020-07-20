import { DEFAULT_FEATURE } from './constants';
import getStateByFeatureAndAction from './getStateByFeatureAndAction';

/**
 * Returns Redux state by action namespace.
 *
 * @param {Object} action action with a `meta.namespace` property
 * @param {Object} state
 * @returns {*} state slice
 */
const getStateByAction = getStateByFeatureAndAction(DEFAULT_FEATURE);

export default getStateByAction;
