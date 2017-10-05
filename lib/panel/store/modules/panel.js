import uuid from 'uuid/v4';
import * as types from '../mutation-types';
import { capybarize } from '../../capybarize';

const state = {
  watching: false,
  eventGroups: [],
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
  [types.CONTENT_CONNECT](state, value) {
    // nothing to do.
  },
  [types.PANEL_TOGGLE_WATCHING](state, value) {
    if (value === true || value === false) {
      state.watching = value;
    } else {
      state.watching = !state.watching;
    }
  },

  [types.PANEL_CLEAR](state, value) {
    state.eventGroups = [];
  },

  [types.CONTENT_FIRE](state, value) {
    const code = capybarize(value);

    if (!code) return;

    state.eventGroups.push({
      key: uuid(),
      events: [{
        key: uuid(),
        event: value,
        code,
      }],
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
