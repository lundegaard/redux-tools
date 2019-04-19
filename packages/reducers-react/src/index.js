import { makeHook, makeDecorator, Provider } from '@redux-tools/injectors-react';
import { storeInterface } from '@redux-tools/reducers';

export { default as namespacedConnect } from './namespacedConnect';
export { Provider };

export const useReducers = makeHook(storeInterface);
export const withReducers = makeDecorator(storeInterface, useReducers);
