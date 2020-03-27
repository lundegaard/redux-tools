import { mergeDeepLeft } from 'ramda';

import { NAMESPACE_PREVENTED } from './constants';

/**
 * Associates an action with a default namespace, overwriting any previous namespace.
 *
 * @param {Object} action action to add the default namespace to
 */
const preventNamespace = action =>
	mergeDeepLeft({ meta: { namespace: NAMESPACE_PREVENTED } }, action);

export default preventNamespace;
