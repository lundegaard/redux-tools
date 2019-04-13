import { curry, remove, indexOf, reduce } from 'ramda';

const withoutOnce = curry((xs, from) =>
	reduce((acc, x) => remove(indexOf(x, acc), 1, acc), from, xs)
);

export default withoutOnce;
