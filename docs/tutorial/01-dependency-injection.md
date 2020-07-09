# Dependency Injection

> Dependency injection is one form of the broader technique of inversion of control. A client who wants to call some services should not have to know how to construct those services.
>
> -- <cite>Abraham Lincoln</cite> (probably)

Let's face it, maintaining large applications is not easy, especially if everything is [tangled together](<https://en.wikipedia.org/wiki/Coupling_(computer_programming)>) and [spread all over the place](<https://en.wikipedia.org/wiki/Cohesion_(computer_science)>). The recommendation when using Redux is to [only ever have a single store](https://redux.js.org/faq/store-setup#can-or-should-i-create-multiple-stores-can-i-import-my-store-directly-and-use-it-in-components-myself). Furthermore, `createStore` expects you to pass the root reducer statically, meaning that if your React application is sprawling with features and various modules, you'd have to import all the necessary reducers your application would ever need in some kind of `configureStore.js` file. This approach is not scalable.

It is very likely that the modules are already responsible for fetching their data and defining their [npm dependencies](https://classic.yarnpkg.com/blog/2017/08/02/introducing-workspaces/), what if they could be responsible for defining their Redux dependencies (such as reducers) as well? Redux Tools make this possible.

!> This tutorial assumes basic knowledge of the [Redux](https://redux.js.org/) library.

First, it is necessary to prepare your store for these shenanigans. We need to go from this:

```js
import { reducer as userManagement } from '@awesome-project/user-management';
import { reducer as authentication } from '@awesome-project/authentication';
import { createStore, combineReducers } from 'redux';

export const configureStore = () =>
	createStore(
		combineReducers({
			userManagement,
			authentication,
			// And like 20 more reducers...
		})
	);
```

To this:

```js
import { createStore, combineReducers } from 'redux';
import { makeReducersEnhancer } from '@redux-tools/react';

export const configureStore = () => createStore(state => state, makeReducersEnhancer());
```

Usually, your modules will expose a single React component, serving as the entry point.

```js
import React from 'react';
import { Router, Route } from '@awesome-project/routing';
import UserManagement from '@awesome-project/user-management';
import ArticleManagement from '@awesome-project/article-management';

const App = () => (
	<Router>
		<Route component={UserManagement} path="/user-management" />
		<Route component={ArticleManagement} path="/article-management" />
	</Router>
);
```

This is fine. We don't have to do anything here. As explained earlier, it is the modules themselves that should be responsible for defining their dependencies! Let's take a look at one of them.

```js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, fetchUsers } from './redux';
import { UserGrid } from './components';

const UserManagement = () => {
	const dispatch = useDispatch();
	const users = useSelector(getUsers);

	useEffect(() => dispatch(fetchUsers()), []);

	return <UserGrid users={users} />;
};

export default UserManagement;
```

Okay, now how do we use Redux Tools to define the Redux dependencies of this module?

```js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withReducers } from '@redux-tools/react';
import reducer, { getUsers, fetchUsers } from './redux';
import { UserGrid } from './components';

const UserManagement = () => {
	const dispatch = useDispatch();
	const users = useSelector(getUsers);

	useEffect(() => dispatch(fetchUsers()), []);

	return <UserGrid users={users} />;
};

const enhance = withReducers({ userManagement: reducer });

export default enhance(UserManagement);
```

Looks easy enough, right? When the user management module is mounted, its reducer will be injected as well. Furthermore, when this module is unmounted, the reducer gets ejected too!

Because we no longer reference all the reducers in the root of the application, [code splitting](https://reactjs.org/docs/code-splitting.html) is now possible. All your module-specific Redux code can thus be fetched alongside the React code, which is invaluable for ultra-large applications.
