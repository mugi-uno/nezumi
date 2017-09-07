import Vue from 'vue';
import Vuex from 'vuex';
import { chromeMessagingPlugin } from './plugins/chromeExtention';

import panel from './modules/panel';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    panel,
  },
  plugins: [chromeMessagingPlugin(chrome.runtime.connect({name: 'devtool'}))],
});
