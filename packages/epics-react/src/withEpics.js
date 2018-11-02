import { prop } from 'ramda';
import { makeInjector } from '@redux-tools/injectors-react';

const withEpics = makeInjector(prop('injectEpics'), prop('removeEpics'));

export default withEpics;
