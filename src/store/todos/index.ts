import { Store as VuexStore, CommitOptions, DispatchOptions, Module } from 'vuex';

import { RootState } from '@/store';

import { state } from './state';
import { getters, Getters } from './getters';
import { mutations, Mutations } from './mutations';
import { actions, Actions } from './actions';

import type { State } from './state';
export { State };

type Namespaced<T, N extends string> = {
  [P in keyof T & string as `${N}/${P}`]: T[P];
};

export type NamespacedMutations = Namespaced<Actions, 'todo'>;

export type TodoStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof NamespacedMutations>(
    key: K,
    payload: Parameters<NamespacedMutations[K]>[1],
    options?: DispatchOptions
  ): ReturnType<NamespacedMutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export const store: Module<State, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
