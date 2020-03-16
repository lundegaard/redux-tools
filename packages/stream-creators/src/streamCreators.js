import { map } from 'rxjs/operators';
import { prop } from 'ramda';
import { DEFAULT_FEATURE, getStateByNamespace } from '@redux-tools/namespaces';

/**
 * Stream creator to pass as `streamCreator` to the enhancer. Adds a `namespacedState$` argument
 * to each epic, allowing access to state based on the namespace of the epic.
 */
export const namespacedState$ = ({ feature = DEFAULT_FEATURE, namespace, state$ }) =>
	state$.pipe(map(getStateByNamespace(feature, namespace)));

/**
 * Stream creator to pass as `streamCreator` to the enhancer. Adds a `globalAction$` argument
 * to each epic, allowing access to actions of all namespaces, not just the epic's.
 */
export const globalAction$ = prop('globalAction$');
