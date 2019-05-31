import { makeHook, makeDecorator, Provider, useNamespace } from '@redux-tools/injectors-react';
import { config } from '@redux-tools/middleware';

export { Provider, useNamespace };

export const useMiddleware = makeHook(config);
export const withMiddleware = makeDecorator(config);
