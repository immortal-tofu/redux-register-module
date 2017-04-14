import curry from 'curry';

let moduleReducerKey = 'module';
const moduleReducers = {};
let reducerHasBeenGet = false;

export const getModuleReducerKey = () => {
  return moduleReducerKey;
};

export const setModuleReducerKey = (key) => {
  moduleReducerKey = key;
};

export const getReducers = () => {
  reducerHasBeenGet = true;
  return moduleReducers
};

export const registerModuleReducer = (moduleName, reducer) => {
  if (reducerHasBeenGet === true) {
    console.warn(`It seems you try to register "${moduleName}" but reducers has been already get.`);
  }
  if (!moduleReducers[moduleName]) moduleReducers[moduleName] = reducer;
  else console.warn(`The reducer "${moduleName}" is already registered. Please check you don't register your reducer twice.`);
};

export const getModuleState = curry((moduleName, state) => (
  state[moduleReducerKey][moduleName]
));

const moduleSagas = [];
let sagaHasBeenGet = false;

export const getSagas = () => {
  sagaHasBeenGet = true;
  return moduleSagas;
};

export const registerModuleSaga = (saga) => {
  if (reducerHasBeenGet === true) {
    console.warn(`It seems you try to register "${moduleName}" but sagas has been already get.`);
  }
  moduleSagas.push(saga);
};
