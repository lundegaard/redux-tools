# Version locks

This file describes reasons for why some dependencies have an exact version instead of a caret one.

- `eslint-plugin-import@2.20.0` because higher version throws ordering errors for imports on Windows
