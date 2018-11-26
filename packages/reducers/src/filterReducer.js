import { isActionFromNamespace } from '@redux-tools/namespaces';

const filterReducer = (reducer, namespace) => (state, action) =>
	isActionFromNamespace(namespace, action) ? reducer(state, action) : state;

export default filterReducer;
