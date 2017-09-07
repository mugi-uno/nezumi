import * as types from '../mutation-types';
import { capybarize } from '../../capybarize';

const state = {
  watching: false,
  events: [],
};

const getters = {
};

const actions = {
  toggleWatching({ commit, state }) {
    commit(types.PANEL_TOGGLE_WATCHING, !state.watching);
  },
  clearPanel({ commit }) {
    commit(types.PANEL_CLEAR);
  },
};

const mutations = {
  [types.PANEL_TOGGLE_WATCHING](state, value) {
    if (value === true || value === false) {
      state.watching = value;
    } else {
      state.watching = !state.watching;
    }
  },

  [types.PANEL_CLEAR](state, value) {
    state.events = [];
  },

  [types.CONTENT_FIRE](state, value) {
    const code = capybarize(value);

    if (!code) return;

    state.events.push({ event: value, code });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
