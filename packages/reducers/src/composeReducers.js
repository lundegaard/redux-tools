import { reduceRight } from 'ramda';

const composeReducers = (...reducers) => (state, action) =>
	reduceRight((reducer, currentState) => reducer(currentState, action), state, reducers);

export default composeReducers;
