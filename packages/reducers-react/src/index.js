import { makeHook, makeDecorator } from '@redux-tools/injectors-react';
import { storeInterface } from '@redux-tools/reducers';

export const useReducers = makeHook(storeInterface);
export const withReducers = makeDecorator(storeInterface, useReducers);
