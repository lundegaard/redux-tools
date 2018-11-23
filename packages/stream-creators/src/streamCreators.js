import { map } from 'rxjs/operators';
import { prop } from 'ramda';
import { getStateByNamespace } from '@redux-tools/reducers';

export const namespacedState$ = ({ namespace, state$ }) =>
	state$.pipe(map(getStateByNamespace(namespace)));

export const globalAction$ = prop('globalAction$');
