import { ActionTree, ActionContext } from 'vuex';
import { RootState } from '@/store';
import { AppState, closeSidebar } from './state';
import { Mutations } from './mutations';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<AppState, RootState>, 'commit'>;

export interface Actions {
  toggleSideBar({ commit }: AugmentedActionContext): void;
  closeSideBar({ commit }: AugmentedActionContext, anim: closeSidebar): void;
  toggleDevice({ commit }: AugmentedActionContext, device: string): void;
}

export const actions: ActionTree<AppState, RootState> & Actions = {
  toggleSideBar({ commit }: AugmentedActionContext) {
    commit('TOGGLE_SIDEBAR');
  },
  closeSideBar({ commit }: AugmentedActionContext, anim) {
    commit('CLOSE_SIDEBAR', anim);
  },
  toggleDevice({ commit }: AugmentedActionContext, device) {
    commit('TOGGLE_DEVICE', device);
  },
};
