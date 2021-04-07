import { ActionTree, Commit } from 'vuex';
import { State } from './state';
import { ActionTypes, MutationTypes } from './counter.types';

export interface Actions {
  [ActionTypes.GET_COUNTER]({ commit }: { commit: Commit }, payload: number): Promise<number>;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.GET_COUNTER]({ commit }, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit(MutationTypes.SET_COUNTER, data);
        resolve(data);
      }, 500);
    });
  },
};
