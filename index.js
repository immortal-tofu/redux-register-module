"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const test = {
//   popo: { coucou: { hello: "3", bonjour: 4 } },
//   modules: { coucou: { hello: "3", bonjour: 4 } }
// };
const moduleReducers = {};
let moduleReducerKey;
let reducerHasBeenGet;
moduleReducerKey = "module";
reducerHasBeenGet = false;
exports.getModuleReducerKey = () => moduleReducerKey;
exports.setModuleReducerKey = (key) => {
    moduleReducerKey = key;
};
function getReducers() {
    reducerHasBeenGet = true;
    return moduleReducers;
}
exports.getReducers = getReducers;
function registerModuleReducer(moduleName, reducer) {
    if (reducerHasBeenGet === true) {
        console.warn(`It seems you try to register "${moduleName}" but reducers has been already get.`);
    }
    if (!moduleReducers[moduleName])
        moduleReducers[moduleName] = reducer;
    else
        console.warn(`The reducer "${moduleName}" is already registered. Please check you don't register your reducer twice.`);
}
exports.registerModuleReducer = registerModuleReducer;
function getModuleState(moduleName, state, moduleReducer = moduleReducerKey) {
    return state[moduleReducer][moduleName];
}
exports.getModuleState = getModuleState;
const moduleSagas = [];
let sagaHasBeenGet = false;
exports.getSagas = () => {
    sagaHasBeenGet = true;
    return moduleSagas;
};
exports.registerModuleSaga = (saga) => {
    if (sagaHasBeenGet === true) {
        console.warn("It seems you try to register a saga but sagas has been already get.");
    }
    moduleSagas.push(saga);
};
