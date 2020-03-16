import { storeInterface } from '@redux-tools/middleware';
import { makeHook, makeDecorator } from '@redux-tools/injectors-react';

export const useMiddleware = makeHook(storeInterface);
export const withMiddleware = makeDecorator(storeInterface, useMiddleware);
