import { makeHook, makeDecorator, Provider } from '@redux-tools/injectors-react';

export { Provider };
export const TYPE = 'middleware';
export const useMiddleware = makeHook(TYPE);
export const withMiddleware = makeDecorator(TYPE);
