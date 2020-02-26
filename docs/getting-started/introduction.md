# Redux Tools {docsify-ignore-all}

[![GitHub Stars](https://img.shields.io/github/stars/lundegaard/redux-tools)](https://github.com/lundegaard/redux-tools)
[![GitHub Issues](https://img.shields.io/github/issues/lundegaard/redux-tools?color=bada55)](https://github.com/lundegaard/redux-tools)
[![License](https://img.shields.io/badge/licence-MIT-ff69b4)](https://github.com/lundegaard/redux-tools)

A collection of tools for maintaining large Redux applications by enabling dependency injection of Redux code and development of multi-instance components by namespacing their state.

Redux Tools consist mainly of:

- [Store enhancers](https://github.com/reduxjs/redux/blob/master/docs/Glossary.md#store-enhancer) for injecting reducers, epics, and middleware into your Redux store after the store is created.
- Utility functions for less verbose definitions of action creators and reducers.

Although the Redux Tools core is platform-agnostic, [React](https://github.com/facebook/react/) bindings are included for tying the injection mechanism to the lifecycle of your components. The [quick start guide](/getting-started/quick-start) and the [tutorial](/tutorial/01-dependency-injection) use React as the view library of choice.

## Packages

Here are the packages you'll definitely want to use in a React application:

- [@redux-tools/actions](/packages/actions), functions for creating [FSA-compliant](https://github.com/redux-utilities/flux-standard-action) action creators and reducers
- [@redux-tools/reducers](/packages/reducers), store enhancer for asynchronous injection of reducers
- [@redux-tools/reducers-react](/packages/reducers-react), React bindings for the `reducers` package
- [@redux-tools/namespaces](/packages/namespaces), logic for associating Redux actions with a namespace (if using [namespaces](/tutorial/02-namespacing))

Based on your preferred method of handling asynchronous flow, choose any of the following packages as well:

- [@redux-tools/epics](/packages/epics), store enhancer for asynchronous injection of epics
- [@redux-tools/epics-react](/packages/epics-react), React bindings for the `epics` package
- [@redux-tools/stream-creators](/packages/stream-creators), collection of stream creators for the `epics` package
- [@redux-tools/middleware](/packages/middleware), store enhancer for asynchronous injection of middleware
- [@redux-tools/middleware-react](/packages/middleware-react), React bindings for the `middleware` package
- [@redux-tools/thunk](/packages/thunk), custom implementation of [Redux Thunk](https://github.com/reduxjs/redux-thunk) for namespaced usage

## Changelog

See the [CHANGELOG.md](https://github.com/lundegaard/redux-tools/blob/master/CHANGELOG.md) file in our [repository](https://github.com/lundegaard/redux-tools).

## Resources

- [Beyond Simplicity: Using Redux in Dynamic Applications](https://medium.com/@wafflepie/beyond-simplicity-using-redux-in-dynamic-applications-ae9e0aea928c) (published 21 Jan 2019)
- [React Union repository](https://github.com/lundegaard/react-union) (embedding React applications into CMSs)

## License

All packages are distributed under the MIT license. See the license [here](https://github.com/lundegaard/redux-tools/blob/master/LICENSE).
