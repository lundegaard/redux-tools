# Middleware (React Extension)

> yarn add @redux-tools/middleware-react

React HOC and wrappers for the `@redux-tools/middleware` package. Simplifies usage of redux-tools
with react.

## Usage example

The snippet shows the most simple usage of the package. `withMiddleware()` function defines a set
of reducers with options that will be injected during component mount phase and ejected during
unmount phase.

```js
import React from 'react';
import { withMiddleware } from '@redux-tools/middleware-react';
import {middlewareReduxA} from './middleware';

const Application = () => null;

export default withMiddleware({
    // Middleware
    middlewareReduxA,
}, {
   // Global bool needs to be true if we don't provide namespace
   isGlobal: true,
   // Injected middleware persist even after unmount (could be removed explicitly via ejectMiddleware)
   isPersistent: false,
})(Application);
```

!> TODO: Example link

## API Reference

### withMiddleware()

Creates a component decorator which handles the lifecycle of passed middleware, mounting and
unmounting them automatically. The namespace of the middleware is determined based on React context.

**Arguments**

1. `middleware` ( _Object_ ): The middleware to use.
2. [`options`] ( _Object_ ): Options for the decorator. The following keys are supported:
   - [`isGlobal`] ( _boolean_ ): Should be `true` if no namespace is provided
   - [`isPersistent`] ( _boolean_ ): Define whether middleware should be auto-ejected after unmount
   - [`namespace`] ( _string_ ): Namespace the middleware were injected under.
   - [`feature`] ( _string_ ):
 
!> TODO: Feature description

**Returns**

(_Function_): A component decorator


### useMiddleware()

!> TODO: useMiddleware

**Arguments**

**Example**


### useNamespace()

!> TODO: useNamespace

**Arguments**

**Example**


### Provider

A component that provides injection mechanism to nested components. See
[injectors-react](/injectors-react/index.md) for more info.
