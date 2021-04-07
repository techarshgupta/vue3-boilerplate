import { createLogger, createStore } from 'vuex';

import counter from './counter';

export default createStore({
  strict: true,
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  modules: {
    counter,
  },
});
