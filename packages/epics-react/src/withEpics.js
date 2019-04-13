import { makeDecorator } from '@redux-tools/injectors-react';

import configuration from './configuration';

const withEpics = makeDecorator(configuration);

export default withEpics;
