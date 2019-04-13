import { makeHook } from '@redux-tools/injectors-react';

import configuration from './configuration';

const useEpics = makeHook(configuration);

export default useEpics;
