# Utils React

> yarn add @redux-tools/utils-react

Various React-specific utility functions used throughout the packages, not explicitly tied to 
a domain.

## API Reference

### getDisplayName()

Extracts the display name of a React component.

**Arguments**

1. `Component` ( _React.Component_ ): React component to get the display name of

**Returns**

( _string_ ): Display name of the component

**Example**

```javascript
import { getDisplayName }from '@redux-tools/utils-react';
 
const Component = () => ('Component');
Component.displayName = 'Name';

getDisplayName(Component);
// Name
```


### withProps()

Adds external props to React Component.

**Arguments**

1. `otherProps` ( _Object | Function_ ): An object of props or a function that modifies provided props
2. `Component` ( _React.Component_ ): React component

**Returns**

( _string_ ): Display name of the component

**Example**

```javascript
import { withProps }from '@redux-tools/utils-react';
 
const ComponentObject = () => ('Component');
const ExtendedComponentObject = withProps({ foo: 'bar' }, ComponentObject);

<ExtendedComponentObject />
// Extended component has `props.foo == 'bar'`
 
// ---

const ComponentFunc = () => ('Component');
const ExtendedComponentFunc = withProps(
   ({ foo }) => ({ foo: foo.toUpperCase() }), 
   ComponentFunc
);

<ExtendedComponentFunc foo='bar' />
// Extended component has `props.foo == 'BAR` 
```
