import { NAMESPACE_PREVENTED } from './constants';
import mergeNamespace from './mergeNamespace';

/**
 * Associates an action with a "global" namespace, overwriting any previous namespace.
 *
 * @param {Object} action action to add the "global" namespace to
 */
const preventNamespace = action => mergeNamespace(true, NAMESPACE_PREVENTED, action);

export default preventNamespace;
