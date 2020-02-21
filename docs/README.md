# Redux Tools

![](https://img.shields.io/github/stars/lundegaard/redux-tools)
![](https://img.shields.io/github/issues/lundegaard/redux-tools?color=bada55)
![](https://img.shields.io/badge/licence-MIT-ff69b4)

- Redux Tools is a collection of enhancers and utility functions for asynchronous injecting and ejecting
  of reducers, middleware and epics after store creation. It could be used independently or with
  [React](https://github.com/facebook/react/) (see `@react-tools/*-react` packages).

- When using React, injection/ejection could be done automatically during React component
  lifecycle (via HOCs or hooks, e.g. inject during mounting, eject after unmounting).

- Redux Tools also provides a possibility to divide Redux store into logical parts - global space,
  features and namespaces.

- It's suitable to use with SPA-in-CMS solutions, such as
  [React Union](https://github.com/lundegaard/react-union).

## Packages

- [@redux-tools/actions](/actions/index.md) – functions for creating [FSA-compliant](https://github.com/redux-utilities/flux-standard-action) action creators and reducers
- [@redux-tools/reducers](/reducers/index.md) – Redux store enhancer for asynchronous injection of reducers
- [@redux-tools/reducers-react](/reducers-react/index.md) – React bindings for the reducers package
- [@redux-tools/epics](/epics/index.md) – Redux store enhancer for asynchronous injection of epics
- [@redux-tools/epics-react](/epics-react/index.md) – React bindings for the epics package
- [@redux-tools/stream-creators](/stream-creators/index.md) – collection of stream creators for the epics package
- [@redux-tools/middleware](/middleware/index.md) – Redux store enhancer for asynchronous injection of middleware
- [@redux-tools/middleware-react](/middleware-react/index.md) – React bindings for the middleware package
- [@redux-tools/thunk](/thunk/index.md) – adapted Redux Thunk library for usage with namespaces
- [@redux-tools/namespaces](/namespaces/index.md) – logic for associating Redux actions with a namespace

## Resources

- [Beyond Simplicity: Using Redux in Dynamic Applications](https://medium.com/@wafflepie/beyond-simplicity-using-redux-in-dynamic-applications-ae9e0aea928c) (published 21 Jan 2019)
- [React Union repository](https://github.com/lundegaard/react-union)

## License

All packages are distributed under the MIT license. See the license [here](https://github.com/lundegaard/redux-tools/blob/master/LICENSE).
