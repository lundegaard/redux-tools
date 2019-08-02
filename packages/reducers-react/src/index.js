import { storeInterface } from '@redux-tools/reducers';
import { makeHook, makeDecorator, Provider, useNamespace } from '@redux-tools/injectors-react';

export { default as namespacedConnect } from './namespacedConnect';
export { Provider, useNamespace };

export const useReducers = makeHook(storeInterface);
export const withReducers = makeDecorator(storeInterface, useReducers);
