export interface AppState {
  device: string;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

export interface closeSidebar {
  withoutAnimation: boolean;
}

export const appState: AppState = {
  device: 'desktop',
  sidebar: {
    opened: false,
    withoutAnimation: false,
  },
};
