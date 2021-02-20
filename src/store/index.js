import Vue from 'vue';
import Vuex from 'vuex';

import VuexPersistence from 'vuex-persist';

import projects from './modules/projects';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: {
    projects,
  },
  plugins: [
    vuexLocal.plugin,
  ],
});
