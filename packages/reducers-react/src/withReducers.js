import { prop } from 'ramda';
import { makeInjector } from '@redux-tools/injectors-react';

const withReducers = makeInjector(prop('injectReducers'), prop('ejectReducers'));

export default withReducers;
