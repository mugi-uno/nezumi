import uuid from 'uuid/v4';
import _ from 'lodash';
import * as types from '../mutation-types';
import { capybarize } from '../../capybarize';

const state = {
  watching: false,
  events: [],
  showHidden: false,
};

const getters = {
};

const actions = {
  toggleWatching({ commit, state }) {
    commit(types.PANEL_TOGGLE_WATCHING, !state.watching);
  },
  toggleHidden({ commit, state }) {
    commit(types.PANEL_TOGGLE_HIDDEN, !state.watching);
  },
  toggleEvent({ commit, state }, key) {
    commit(types.PANEL_TOGGLE_EVENT, key);
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
    state.events = [];
  },

  [types.PANEL_TOGGLE_HIDDEN](state) {
    state.showHidden = !state.showHidden;
  },

  [types.PANEL_TOGGLE_EVENT](state, key) {
    const index = state.events.findIndex(e => e.key === key);
    if (~index) {
      const e = state.events[index];
      e.open = !e.open;
    }
  },

  [types.CONTENT_FIRE](state, originalEvent) {
    const lastEventIndex = _.findLastIndex(state.events, e => !e.hidden);
    const lastEvent = state.events[lastEventIndex];

    if (isDropEvent(lastEvent, originalEvent)) return;

    const capybara = capybarize(originalEvent);

    if (!capybara) return;

    const event = {
      key: uuid(),
      original: originalEvent,
      capybara: capybara.map(c => Object.assign({ key: uuid() }, c)),
      open: false,
      hidden: false,
    };

    state.events.push(event);

    if (isHiddenLastEvent(lastEvent, originalEvent)) {
      state.events[lastEventIndex].hidden = true;
    }
  },
};

const isDropEvent = (lastEvent, originalEvent) => {
  if (!lastEvent) return false;

  if (
    _.get(lastEvent.original, 'element.tagName') === 'label' &&
    _.get(lastEvent.original, 'element.attr.for') === _.get(originalEvent, 'selector.id') &&
    _.get(lastEvent.original, 'event') === 'click' && _.get(originalEvent, 'event') === 'click'
  ) {
    return true;
  }

  return false;
};

const isHiddenLastEvent = (lastEvent, originalEvent) => {
  if (!lastEvent) return false;

  if (
    (_.get(lastEvent.original, 'selector.xpath') !== _.get(originalEvent, 'selector.xpath')) &&
    !(
      _.get(lastEvent.original, 'element.tagName') === 'label' &&
      _.get(lastEvent.original, 'element.attr.for') === _.get(originalEvent, 'selector.id')
    )
  ) {
    return false;
  }

  if (_.get(lastEvent.original, 'event') === 'click' && _.get(originalEvent, 'event') === 'change') return true;

  return false;
};

export default {
  state,
  getters,
  actions,
  mutations,
};
