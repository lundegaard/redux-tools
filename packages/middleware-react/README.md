# @redux-tools/middleware-react

React bindings for the @redux-tools/middleware package.

## API Reference

### `withMiddleware`

Creates a component decorator which handles the lifecycle of passed middleware, mounting and unmounting them automatically. The namespace of the middleware is determined based on React context.

#### Arguments

1. `middleware` (_Object_): The middleware to use.

#### Returns

(_Function_): A component decorator.

#### Example

```js
import React from 'react';
import { withMiddleware } from '@redux-tools/middleware-react';

import { middleware } from './duck';

const Container = () => null;

export default withMiddleware({ someMiddleware: middleware })(Container);
```

### `<Provider />`

See [injectors-react](../injectors-react/README.md) for more info.
