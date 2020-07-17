import { map, applyTo, compose } from 'ramda';

const composeMiddleware = (...middleware) => reduxApi => next =>
	compose(...map(applyTo(reduxApi), middleware))(next);

export default composeMiddleware;
