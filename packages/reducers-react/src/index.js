import { makeHook, makeDecorator, Provider, useNamespace } from '@redux-tools/injectors-react';
import { config } from '@redux-tools/reducers';

export { default as namespacedConnect } from './namespacedConnect';
export { Provider, useNamespace };

export const useReducers = makeHook(config);
export const withReducers = makeDecorator(config);
