import { storeInterface } from '@redux-tools/reducers';
import { makeHook, makeDecorator } from '@redux-tools/injectors-react';

export const useReducers = makeHook(storeInterface);
export const withReducers = makeDecorator(storeInterface, useReducers);
