import { makeHook } from '@redux-tools/injectors-react';

import configuration from './configuration';

const useReducers = makeHook(configuration);

export default useReducers;
