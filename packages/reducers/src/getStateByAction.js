import { useWith, identity } from 'ramda';
import { getNamespaceByAction } from '@redux-tools/namespaces';

import getStateByNamespace from './getStateByNamespace';

/**
 * Returns Redux state by action namespace.
 *
 * @see getStateByNamespace
 *
 * @param {Object} action action with an optionally defined meta.namespace property
 * @param {Object} state Redux state
 * @returns {?Object} namespaced Redux state
 */
const getStateByAction = useWith(getStateByNamespace, [getNamespaceByAction, identity]);

export default getStateByAction;
