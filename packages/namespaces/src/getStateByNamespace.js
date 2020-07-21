import { DEFAULT_FEATURE } from './constants';
import getStateByFeatureAndNamespace from './getStateByFeatureAndNamespace';

/**
 * Returns Redux state by namespace.
 *
 * @param {string} namespace
 * @param {Object} state
 * @returns {*} state slice
 */
const getStateByNamespace = getStateByFeatureAndNamespace(DEFAULT_FEATURE);

export default getStateByNamespace;
