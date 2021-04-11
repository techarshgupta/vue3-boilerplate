import { Counter } from '@/model/Counter.model';
import { MutationTree } from 'vuex';
import { State } from './state';

export type Mutations<S = State> = {
  ADD_COUNTER(state: S, count: Counter): void;
};

export const mutations: MutationTree<State> & Mutations = {
  ADD_COUNTER(state: State, count: Counter) {
    state.count = count.count;
  },
};
