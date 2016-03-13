import {init} from './models';

let _store;

export function initModels() {
  init(_store);
}

export function setStore(store) {
  _store = store;
}

export function getStore() {
  return _store;
}
