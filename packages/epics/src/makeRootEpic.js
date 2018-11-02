import { identity, mergeDeepRight, o, contains, prop, map, applyTo } from 'ramda';
import * as Rx from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { isActionFromNamespace } from '@redux-tools/namespaces';

import { ActionTypes } from './actions';

const filterActionStream = (action$, namespace) =>
	action$.pipe(Rx.filter(isActionFromNamespace(namespace)));

const addNamespaceToActions = namespace =>
	namespace ? Rx.map(mergeDeepRight({ meta: { namespace } })) : identity;

const takeUntilStopAction = (action$, id) =>
	Rx.takeUntil(
		action$.pipe(
			ofType(ActionTypes.STOP_EPICS),
			Rx.filter(o(contains(id), prop('payload')))
		)
	);

/**
 * Wraps an epic stream to create a mountable root epic.
 *
 * @param {Observable} epic$ stream of epics
 * @returns {Function} epic to pass to the middleware
 */
const makeRootEpic = (epic$, streamCreators) => (action$, state$, dependencies) =>
	epic$.pipe(
		Rx.mergeMap(({ id, epic, namespace }) =>
			epic(
				filterActionStream(action$, namespace),
				state$,
				...map(applyTo({ id, epic, namespace, action$, state$ }), streamCreators),
				dependencies
			).pipe(
				addNamespaceToActions(namespace),
				// NOTE: takeUntil should ALWAYS be the last operator in `.pipe()`
				// https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef
				takeUntilStopAction(action$, id)
			)
		)
	);

export default makeRootEpic;
