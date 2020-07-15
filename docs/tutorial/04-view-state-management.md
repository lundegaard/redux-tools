# View State Management {docsify-ignore-all}

Redux Tools support deep reducer injection, meaning that you can organize state for huge applications very easily.

```json
{
	"userManagement": {
		"userDetail": null,
		"userList": [],
		"hasPermissions": true
	}
}
```

```js
// Dummy reducer, manages `state.userManagement.userList`
const userListReducer = () => [];

const UserList = () => {
	const users = useSelector(getUsers);

	return users.map(user => user.name);
};

export default withReducers({
	userManagement: {
		userList: userListReducer,
	},
})(UserList);
```

```js
// Dummy reducer, manages `state.userManagement.userDetail`
const userDetailReducer = () => null;

const UserDetail = ({ userId }) => {
	const user = useSelector(getUser(userId));

	return user.name;
};

export default withReducers({
	userManagement: {
		userDetail: userDetailReducer,
	},
})(UserDetail);
```

```js
// Dummy reducer, manages `state.userManagement` and is composed with the inner reducers.
const userManagementReducer = state => ({
	...state,
	hasPermissions: true,
});

const UserManagement = () => (
	<Router>
		<Route component={UserList} path="/users" />
		<Route component={UserDetail} path="/users/:userId" />
	</Router>
);

export default withReducers({ userManagement: userManagementReducer })(UserDetail);
```
