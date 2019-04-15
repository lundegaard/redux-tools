import { makeHook, makeDecorator, Provider } from '@redux-tools/injectors-react';

export { Provider };
export const TYPE = 'epics';
export const useEpics = makeHook(TYPE);
export const withEpics = makeDecorator(TYPE);
