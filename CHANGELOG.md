# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- Documentation, including the README.md and FAQ.md files.
- (_actions_): `makeActionTypes` as an export of `prefixedValueMirror` from the utils package.

### Fixed

- (_utils_): `getDisplayName` function now handles strings.

## [0.2.0] - 2018-11-29

### Added

- This changelog!

### Changed

- (_epics_): `streamCreators` property has been renamed to `streamCreator` and now accepts a function instead of an array.
- (_injectors-react_): `<Provider />` is now a separate component which accepts `store`, `withNamespace` and `namespace` props directly. It also allows for seamless nesting (no need to always provide all properties).

### Fixed

- The injection mechanism now supports React async rendering.
- (_reducers_): Reducers now filter actions by namespace properly.
