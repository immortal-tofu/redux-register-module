import * as Redux from 'redux';
import * as ReduxSaga from 'redux-saga';

export type ModuleReducers = { [key: string]: Redux.Reducer<any> };

const moduleReducers: ModuleReducers = {};
let moduleReducerKey: string = 'module';
let reducerHasBeenGet: boolean = false;

export const getModuleReducerKey = () => moduleReducerKey;

export const setModuleReducerKey = (key: string) => {
  moduleReducerKey = key;
};

export const getReducers = function getReducers() {
  reducerHasBeenGet = true;
  return moduleReducers;
};

export const registerModuleReducer = function registerModuleReducer(moduleName: string, reducer: Redux.Reducer<any>) {
  if (reducerHasBeenGet) {
    console.warn(`It seems you try to register "${moduleName}" but reducers has been already get.`);
  }
  if (!moduleReducers[moduleName]) moduleReducers[moduleName] = reducer;
  else {
    console.warn(
      `The reducer "${moduleName}" is already registered. Please check you don't register your reducer twice.`
    );
  }
};

export function getModuleState<State, Name extends keyof State[ModuleReducerKey], ModuleReducerKey extends keyof State>(
  moduleName: Name,
  state: State
): State[ModuleReducerKey][Name] {
  const mr = moduleReducerKey as ModuleReducerKey;
  return state[mr][moduleName];
}

const moduleSagas: ReduxSaga.SagaIterator[] = [];
let sagaHasBeenGet = false;

export const getSagas = (): ReduxSaga.SagaIterator[] => {
  sagaHasBeenGet = true;
  return moduleSagas;
};

export const registerModuleSaga = (saga: ReduxSaga.SagaIterator) => {
  if (sagaHasBeenGet) {
    console.warn('It seems you try to register a saga but sagas has been already get.');
  }
  moduleSagas.push(saga);
};
