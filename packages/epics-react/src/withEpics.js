import { makeInjector } from '@redux-tools/injectors-react';

const withEpics = makeInjector(store => store.injectEpics, store => store.removeEpics);

export default withEpics;
