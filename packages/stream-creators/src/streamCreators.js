import { prop } from 'ramda';
import { map } from 'rxjs/operators';

import { DEFAULT_FEATURE, getStateByFeatureAndNamespace } from '@redux-tools/namespaces';

/**
 * Stream creator to pass as `streamCreator` to the enhancer. Adds a `namespacedState$` argument
 * to each epic, allowing access to state based on the namespace of the epic.
 */
export const namespacedState$ = ({ feature, namespace, state$ }) =>
	state$.pipe(map(getStateByFeatureAndNamespace(feature ?? DEFAULT_FEATURE, namespace)));

/**
 * Stream creator to pass as `streamCreator` to the enhancer. Adds a `globalAction$` argument
 * to each epic, allowing access to actions of all namespaces, not just the epic's.
 */
export const globalAction$ = prop('globalAction$');
