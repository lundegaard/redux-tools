import { makeHook, makeDecorator, Provider } from '@redux-tools/injectors-react';
import { config } from '@redux-tools/middleware';

export { Provider };

export const useMiddleware = makeHook(config);
export const withMiddleware = makeDecorator(config);
