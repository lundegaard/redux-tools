import { makeHook, makeDecorator, Provider, useNamespace } from '@redux-tools/injectors-react';
import { config } from '@redux-tools/epics';

export { Provider, useNamespace };

export const useEpics = makeHook(config);
export const withEpics = makeDecorator(config);
