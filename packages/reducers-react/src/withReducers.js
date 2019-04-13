import { makeDecorator } from '@redux-tools/injectors-react';

import configuration from './configuration';

const withReducers = makeDecorator(configuration);

export default withReducers;
