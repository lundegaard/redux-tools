import { makeHook, makeDecorator } from '@redux-tools/injectors-react';
import { storeInterface } from '@redux-tools/middleware';

export const useMiddleware = makeHook(storeInterface);
export const withMiddleware = makeDecorator(storeInterface, useMiddleware);
