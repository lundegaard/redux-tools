import { curry, assocPath } from 'ramda';

const attachNamespace = curry(
	(namespace, action) => (namespace ? assocPath(['meta', 'namespace'], namespace, action) : action)
);

export default attachNamespace;
