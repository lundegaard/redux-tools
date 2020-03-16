import { storeInterface } from '@redux-tools/epics';
import { makeHook, makeDecorator } from '@redux-tools/injectors-react';

export const useEpics = makeHook(storeInterface);
export const withEpics = makeDecorator(storeInterface, useEpics);
