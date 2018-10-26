import * as R from 'ramda';
import * as Rx from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { ActionTypes } from '../actions';
import { getStateByNamespace, isActionFromNamespace } from './namespace';

const filterActionStream = (namespace, action$) =>
	action$.pipe(Rx.filter(isActionFromNamespace(namespace)));

const createNamespacedStateStream = (namespace, state$) =>
	state$.pipe(Rx.map(getStateByNamespace(namespace)));

const addNamespaceToActions = namespace =>
	Rx.map(namespace ? R.mergeDeepRight({ meta: { namespace } }) : R.identity);

const takeUntilStopAction = (id, namespace, action$) =>
	Rx.takeUntil(
		action$.pipe(
			ofType(ActionTypes.STOP_EPICS),
			Rx.filter(R.o(R.contains(id), R.prop('payload')))
		)
	);

/**
 * Wraps an epic stream to accept asynchronous epics.
 *
 * @param {Observable} epic$ stream of asynchronous epics
 * @returns {Function} epic which to passed to the middleware
 */
export const makeRootEpic = epic$ => (action$, state$) =>
	epic$.pipe(
		Rx.mergeMap(([id, epic, namespace]) =>
			epic(
				filterActionStream(namespace, action$),
				state$,
				createNamespacedStateStream(namespace, state$)
			).pipe(
				addNamespaceToActions(namespace),
				// NOTE: takeUntil should ALWAYS be the last operator in `.pipe()`
				// https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef
				takeUntilStopAction(id, namespace, action$)
			)
		)
	);
