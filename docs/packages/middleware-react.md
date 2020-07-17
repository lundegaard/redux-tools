# Middleware (React Bindings)

> yarn add @redux-tools/middleware-react

This package provides React bindings for the [@redux-tools/middleware](/packages/middleware) package.

## Usage Example

```js
import React from 'react';
import { withMiddleware } from '@redux-tools/middleware-react';
import someMiddleware from './someMiddleware';

const Container = () => null;

export default withMiddleware(someMiddleware)(Container);
```

## API Reference

### withMiddleware()

Creates a component decorator which handles the lifecycle of passed middleware, injecting and ejecting them automatically. The namespace of the middleware is determined based on React context.

**Arguments**

1. `middleware` ( _Function|Array|Object_ ): The middleware to use.
2. [`options`] \( _Object_ ): Options for the decorator. The following keys are supported:
   - [`isGlobal`] \( _boolean_ ): Pass `true` if the middleware shouldn't be namespaced.
   - [`isNamespaced`] \( _boolean_ ): Pass `true` if the middleware must be namespaced.
   - [`isPersistent`] \( _boolean_ ): Whether the middleware should be automatically ejected after the component is unmounted.
   - [`namespace`] \( _string_ ): Namespace to inject the middleware under. If passed, the middleware will not handle actions from other namespaces.
   - [`feature`] \( _string_ ): Feature to resolve the namespace by (if using namespace providers).

**Returns**

(_Function_): A component decorator.
