import mergeNamespace from './mergeNamespace';

/**
 * Associates an action with a namespace unless it is already associated with some namespace.
 *
 * @param {?string} namespace namespace to attach
 * @param {Object} action action to add the namespace to
 */
const defaultNamespace = mergeNamespace(false);

export default defaultNamespace;
