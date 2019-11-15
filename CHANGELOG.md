# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## Unreleased

### Fixed

- Appropriate dependencies added to `useEffect` in injection hooks.
- (_middleware_): Injected middleware are now properly called in the order of injection.

## [0.6.0] – 2019-08-06

### Added

- (_namespaces_): Added `attachNamespace`, which always overwrites the original namespace.
- (_middleware_): Middleware now automatically sets the namespace of each dispatched action.
- (_middleware_): `getNamespacedState` and `namespace` are now available in the first argument in all injected middleware.

### Changed

- (_namespaces_): Renamed `attachNamespace` to `defaultNamespace`.

### Fixed

- (_middleware_): Injected middleware are now properly called in the order of injection.
- (_middleware_): Middleware no longer automatically sets the namespace of each action via `next()`.

### Removed

- (_namespaces_): Unnecessary utility functions (`attachFeature` and `getFeatureByAction`).

## [0.5.0] – 2019-05-31

### Added

- Hook-based API. You can now use `useMiddleware`, `useEpics` and `useReducers` with a caveat: don't dispatch any actions until the injectables are injected (based on hook return value). Hooks are also used under the hood for better structure and performance.
- Loads of new useful warnings when injecting and ejecting.
- You can now define namespaces and features statically (or using props) in `withMiddleware`, `withEpics` and `withReducers`.
- You can now inject functions in addition to objects. Note that a function (reducer, middleware or epic) will only be initialized once per namespace/feature.
- Support for Redux Thunk! Just use our clone instead of the official implementation to enable automatic namespace passthrough via thunks.
- (_reducers_): Support for features! This allows using @redux-tools with a feature-based state structure, similar to when using e.g. Redux Form.
- (_reducers-react_): [Warn when using withReducers with global: false and no namespace.](https://github.com/lundegaard/redux-tools/pull/47)

### Changed

- The injection API was changed from `(injectables, namespace, version)` to `(injectables, { namespace, feature })`.
- All the `enhancer` exports were changed to `makeEnhancer` because of ambiguity in the injectable middleware enhancer.
- Loads of internal refactoring under the hood to reduce duplicate code and improve tests maintainability.
- `global` and `persist` options in decorators were renamed to `isGlobal` and `isPersistent`.
- (_middleware_): Injectable middleware enhancer now has an `injectedMiddleware` property, which you must use to signify the execution point of the middleware.

### Fixed

- (_middleware_): Correctly skip duplicate middleware.

## [0.4.0] – 2019-02-07

### Added

- (_reducers_): The reducer passed to `createStore()` as the first argument is now composed with the injected reducers.
- Support for injectable middleware! See the `middleware` and `middleware-react` packages.

### Fixed

- (_injectors-react_): Performance optimizations in `<InjectorContext.Consumer />`.

## [0.3.0] – 2019-01-09

### Added

- Documentation, including the README.md and FAQ.md files.
- (_actions_): `makeActionTypes` as an export of `prefixedValueMirror` from the utils package.

### Fixed

- (_utils_): `getDisplayName` function now handles strings.
- (_injectors-react_): Now compatible with react-redux v6.

## [0.2.0] - 2018-11-29

### Added

- This changelog!

### Changed

- (_epics_): `streamCreators` property has been renamed to `streamCreator` and now accepts a function instead of an array.
- (_injectors-react_): `<Provider />` is now a separate component which accepts `store`, `withNamespace` and `namespace` props directly. It also allows for seamless nesting (no need to always provide all properties).

### Fixed

- The injection mechanism now supports React async rendering.
- (_reducers_): Reducers now filter actions by namespace properly.
