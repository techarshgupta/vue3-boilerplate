import { Store as VuexStore, CommitOptions, DispatchOptions, Module } from 'vuex';

import { RootState } from '@/store';

import { appState as state } from './state';
// import { getters, Getters } from './getters';
import { mutations, Mutations } from './mutations';
import { actions, Actions } from './actions';

import type { AppState } from './state';
export { AppState };

type Namespaced<T, N extends string> = {
  [P in keyof T & string as `${N}/${P}`]: T[P];
};

export type NamespacedMutations = Namespaced<Actions, 'app'>;

export type AppStore<S = AppState> = Omit<VuexStore<S>, 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof NamespacedMutations>(
    key: K,
    payload?: Parameters<NamespacedMutations[K]>[1],
    options?: DispatchOptions
  ): ReturnType<NamespacedMutations[K]>;
};

export const store: Module<AppState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
