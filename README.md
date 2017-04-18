# redux-register-module

## Installation

```
npm install --save redux-register-module
```

See https://www.npmjs.com/package/redux-register-module

## Usage

If you try to split your code in different modules who handle their own reducer, own action and own components, you need to add your reducer, your saga handler in the app.
```
|- src
|  - modules
|    - my-module1
|      - components
|      - actions.js
|      - reducer.js
|      - saga.js
|      - ...
|    - my-module2
|      - components
|      - actions.js
|      - reducer.js
|      - saga.js
|      - ...
|  - store.js
|  - reducers.js
|  - ...
```

This package allows you to register reducer and saga handler from your module. With this, your module stay a standalone package.

## Examples
### Reducer
Basic implementation for a reducer registered from your module, and injected in your store automatically
`node_modules/mymodule/reducer.js`
```
import { registerModuleReducer } from 'redux-register-module';

const initialState = {
  list: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

registerModuleReducer('myModule', reducer);
```

`src/reducers.js`

```
import { combineReducers } from 'redux';

import { getModuleReducerKey, getReducers } from 'redux-register-module';
import 'mymodule/reducer';

// getModuleReducerKey will return the name of where your store module reducers. By default, it will be 'module', you can change it via setModuleReducerKey('myKey')
const rootReducer = combineReducers({
  [getModuleReducerKey()]: combineReducers(getReducers()),
});
```

If you want to read data, you can use the curried function getModuleState as follow:
```
import { getModuleState } from 'redux-register-module';

const myModuleState = getModuleState('myModule');

const mapStateToProps = state => ({
  list: myModuleState(state).list,
  total: myModuleState(state).total,
  otherModuleList: getModuleState('otherModule', state).list,
});
```

Of course, if you prefer use reselect, do it:

```
const myModuleSelector = state => getModuleState('myModule', state).list;
const otherModuleSelector = state => getModuleState('otherModule', state).list;

export const mySelector = createSelector(
  myModuleSelector,
  otherModuleSelector,
  (list1, list2) => (
    ...
  )
);
```

### Saga
Basic implementation for a saga registered from your module, and injected in your middleware
`node_modules/mymodule/saga.js`
```
import { registerModuleSaga } from 'redux-register-module';

const saga = function* saga() {
  yield takeLatest('GET_LIST', function*() {});
};

registerModuleSaga(saga);
```
