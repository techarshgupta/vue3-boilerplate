import { GetterTree } from 'vuex';
import { State } from './state';
import { RootState } from '@/store';

export type Getters = {
  doubledCounter(state: State): number;
};

export const getters: GetterTree<State, RootState> & Getters = {
  doubledCounter: (state) => {
    return state.count * 2;
  },
};
