import { storeInterface } from '@redux-tools/epics';
import { makeHook, makeDecorator, Provider, useNamespace } from '@redux-tools/injectors-react';

export { Provider, useNamespace };

export const useEpics = makeHook(storeInterface);
export const withEpics = makeDecorator(storeInterface, useEpics);
