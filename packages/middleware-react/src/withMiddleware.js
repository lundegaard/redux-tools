import { prop } from 'ramda';
import { makeInjector } from '@redux-tools/injectors-react';

const withMiddleware = makeInjector(prop('injectMiddleware'), prop('ejectMiddleware'));

export default withMiddleware;
