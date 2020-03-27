import mergeNamespace from './mergeNamespace';

/**
 * Associates an action with a namespace, overwriting any previous namespace.
 *
 * @param {?string} namespace namespace to attach
 * @param {Object} action action to add the namespace to
 */
const attachNamespace = mergeNamespace(true);

export default attachNamespace;
