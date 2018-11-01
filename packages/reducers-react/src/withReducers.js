import { makeInjector } from '@redux-tools/injectors-react';

const withReducers = makeInjector(store => store.injectReducers, store => store.removeReducers);

export default withReducers;
