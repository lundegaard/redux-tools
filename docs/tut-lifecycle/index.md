# Internal Lifecycle

A lifecycle of all injectable parts (i.e. reducers, middleware, epics, let's call them _items_) is 
always the same. Let's assume that we've got a new store with an _item_ enhancer (always exported as
`makeEnhancer` from the appropriate _item_ package). It adds two methods to our `store`:

- `injectItem()`
- `ejectItem()`

And an object `entries` (again into `store`), so `store.entries` could look like:

```json
{
   "entries": {
      "item": [],

      "reducers": [],
      "middleware": [],
      "epics": []
   }
}
```

Now you are allowed to inject new or eject existing _items_ into/from their arrays. Calling 
of `store.injectItem(itemInstance)` converts `itemInstance` into common "entry" object, e.g.

```javascript
const entry = {
   "feature": "namespaceGroup",
   "namespace": "namespaceName",
   "key": "itemName",
   "value": () => {}
}
```

And adds it into appropriate `store.entries` array (`store.entries.item`). Then a new version of 
store (`createStore` function) based on `store.entries` is created and replaced with current store.
   
![](injectorsLifecycle.png)
