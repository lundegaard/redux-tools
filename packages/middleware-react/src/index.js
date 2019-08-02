import { storeInterface } from '@redux-tools/middleware';
import { makeHook, makeDecorator, Provider, useNamespace } from '@redux-tools/injectors-react';

export { Provider, useNamespace };

export const useMiddleware = makeHook(storeInterface);
export const withMiddleware = makeDecorator(storeInterface, useMiddleware);
