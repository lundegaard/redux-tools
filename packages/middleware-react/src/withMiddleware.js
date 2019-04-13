import { makeDecorator } from '@redux-tools/injectors-react';

import configuration from './configuration';

const withMiddleware = makeDecorator(configuration);

export default withMiddleware;
