import { makeHook } from '@redux-tools/injectors-react';

import configuration from './configuration';

const useMiddleware = makeHook(configuration);

export default useMiddleware;
