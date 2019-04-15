import { makeHook, makeDecorator, Provider } from '@redux-tools/injectors-react';
import { config } from '@redux-tools/epics';

export { Provider };

export const useEpics = makeHook(config);
export const withEpics = makeDecorator(config);
