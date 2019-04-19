import { makeHook, makeDecorator, Provider } from '@redux-tools/injectors-react';
import { storeInterface } from '@redux-tools/epics';

export { Provider };

export const useEpics = makeHook(storeInterface);
export const withEpics = makeDecorator(storeInterface, useEpics);
