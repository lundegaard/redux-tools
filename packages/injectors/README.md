# @redux-tools/injectors

Internal reusable logic for the injection mechanism itself. In order to handle [versioning](../../FAQ.md) more easily, we store all reducers and epics as an array of _entries_. An entry is an object with the `key`, `value`, `namespace` and `version` properties.
