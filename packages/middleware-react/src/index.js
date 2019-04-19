import { makeHook, makeDecorator, Provider } from '@redux-tools/injectors-react';
import { storeInterface } from '@redux-tools/middleware';

export { Provider };

export const useMiddleware = makeHook(storeInterface);
export const withMiddleware = makeDecorator(storeInterface, useMiddleware);
