import { makeHook, makeDecorator, Provider } from '@redux-tools/injectors-react';

export { default as namespacedConnect } from './namespacedConnect';
export { Provider };
export const TYPE = 'reducers';
export const useReducers = makeHook(TYPE);
export const withReducers = makeDecorator(TYPE);
