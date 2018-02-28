const moduleReducers: { [key: string]: any } = {};
let moduleReducerKey: keyof typeof moduleReducers = 'module';
let reducerHasBeenGet: boolean = false;

export const getModuleReducerKey = () => moduleReducerKey;

export const setModuleReducerKey = (key: string) => {
  moduleReducerKey = key;
};

export function getReducers<ReducerType>(): ReducerType {
  reducerHasBeenGet = true;
  return moduleReducers as ReducerType;
}

export function registerModuleReducer<ModuleState>(moduleName: string, reducer: ModuleState) {
  if (reducerHasBeenGet === true) {
    console.warn(`It seems you try to register "${moduleName}" but reducers has been already get.`);
  }
  if (!moduleReducers[moduleName]) moduleReducers[moduleName] = reducer;
  else
    console.warn(
      `The reducer "${moduleName}" is already registered. Please check you don't register your reducer twice.`
    );
}

export function getModuleState<State, Name extends keyof State[ModuleReducerKey], ModuleReducerKey extends keyof State>(
  moduleName: Name,
  state: State,
  moduleReducer: ModuleReducerKey = moduleReducerKey as ModuleReducerKey
): State[ModuleReducerKey][Name] {
  return state[moduleReducer][moduleName];
}

const moduleSagas: any[] = [];
let sagaHasBeenGet = false;

export const getSagas = (): any[] => {
  sagaHasBeenGet = true;
  return moduleSagas;
};

export const registerModuleSaga = (saga: any) => {
  if (sagaHasBeenGet === true) {
    console.warn('It seems you try to register a saga but sagas has been already get.');
  }
  moduleSagas.push(saga);
};
