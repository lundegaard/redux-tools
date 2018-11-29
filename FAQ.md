# FAQ

This FAQ provides reasons for using @redux-tools and explains some of the decisions that we've made during development.

## What's the use case?

@redux-tools are a good choice if you answer "Yes!" to any of these questions.

- Do you want to isolate the Redux state of our widgets while still allowing them to communicate with one another?
- Do you want to associate your reducers and epics with your widget, so that they're injected and ejected when needed?
- Do your selectors include a lot of boilerplate code for accessing widget state?
  - For example, you may want to replace `state => state.widgets.a.something` with `state => state.something`.

@redux-tools aim to solve all of these issues automatically, yet transparently.

## Why not use something like redux-subspace and redux-dynostore?

We think that our implementation is simpler, more transparent and more fit for our use case, especially regarding integration with CMSs.

## How to use @redux-tools with React-union?

1. Replace the react-redux `<Provider />` with one from `@redux-tools/epics-react` or `@redux-tools/reducers-react`
2. Pass `withWidgetContext` as the `withNamespace` prop.

That's it! Now when you use `withReducers`, `withEpics` or `namespacedConnect` in your widget, it will always access the correct namespace.

## Can I use @redux-tools without React?

Of course!

## Can I use @redux-tools without redux-observable?

Absolutely!

## Why do you add versions to all the injectables?

Oh boy, here we go.

### We need to use the constructor for injection.

Why? Because there is no better place, really. The ideal place for side-effects is `componentDidMount`, but because this method is fired for inner components first, it would mean that any actions dispatched in `componentDidMount` would be useless, because the reducers/epics would not at that point be injected yet.

Because `componentWillMount` is getting renamed to `UNSAFE_componentWillMount` and logs a truckload of warnings when you use it, we decided to use the constructor instead.

### Changing the key of a React component can break everything.

Why? Because when a component remounts, the call order of the constructor of the next component and `componentWillUnmount` of the previous one is undefined. Yup, sometimes `componentWillUnmount` will fire **after** the constructor of the new one.

In order to have everything working when a component remounts, we need to make sure that multiple injections result in multiple entries being stored somewhere, otherwise the `componentWillUnmount` hook would eject **both** the injectables! This means that injection must be "sort of idempotent, but not really". Here is an over-the-top visual example.

|                 | After first constructor | After second constructor   | After `componentWillUnmount` |
| --------------- | ----------------------- | -------------------------- | ---------------------------- |
| Naïve injection | [reducer]               | [reducer]                  | []                           |
| Smart injection | [reducer(v1)]           | [reducer(v1), reducer(v2)] | [reducer(v2)]                |

However, two epics being stored **must not** result in the epic running twice! This means that the [extremely easy example of adding new epics asynchronously](https://redux-observable.js.org/docs/recipes/AddingNewEpicsAsynchronously.html) will not work, because we need to check if the epic is running or not.

### React async rendering.

Basically, when you have React async rendering enabled in your application, it can run more smoothly. There are a couple of drawbacks, though; you shouldn't have any _side-effects_ in some of your lifecycle hooks, because they might be called multiple times before the component is rendered (or not rendered). One of these unsafe lifecycle hooks is the constructor, where we handle the injection of our reducers and epics.

This essentially means that when a component remounts in async mode, it needs to clean up after all of its previous constructor calls, but not after the new ones. Here is a visual example of such situation.

| After first constructors   | After second constructors  | After `componentWillUnmount` |
| -------------------------- | -------------------------- | ---------------------------- |
| [reducer(v1), reducer(v2)] | [reducer(v3), reducer(v4)] | [reducer(v3), reducer(v4)]   |

We now have a bunch of constructor calls, but without a way to divide them (first mount and second mount) without delving deep into the React internals. **This is why we also eject injectables with lower versions.**
