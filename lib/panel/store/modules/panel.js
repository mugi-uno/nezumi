import uuid from 'uuid/v4';
import _ from 'lodash';
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

  [types.CONTENT_FIRE](state, originalEvent) {
    const lastEventGroup = _.last(state.eventGroups);

    if (isDropEvent(lastEventGroup, originalEvent)) return;
    
    const code = capybarize(originalEvent);

    if (!code) return;

    const event = {
      key: uuid(),
      original: originalEvent,
      code,
      show: true,
    };


    if (isSameGroup(lastEventGroup, event)) {
      const events = lastEventGroup.events;
      const newEvents = createNewEvents(events, event);
      lastEventGroup.events = newEvents;
      state.eventGroups = state.eventGroups.slice(0, state.eventGroups.length - 1).concat([lastEventGroup]);
    } else {
      state.eventGroups.push({
        key: uuid(),
        events: [event],
      });
    }
  },
};

const isDropEvent = (eventGroup, originalEvent) => {
  if (!eventGroup) return false;
  const lastEvent = _.findLast(eventGroup.events, e => e.show);
  if (!lastEvent) return false;

  if (
    lastEvent.original.element.tagName === 'label' &&
    lastEvent.original.element.attr.for === originalEvent.selector.id &&
    lastEvent.original.event === 'click' && originalEvent.event === 'click'
  ) {
    return true;
  }

  return false;
};

const isSameGroup = (eventGroup, event) => {
  if (!eventGroup) return false;
  const lastEvent = _.findLast(eventGroup.events, e => e.show);
  if (!lastEvent) return false;

  if (
    (lastEvent.original.selector.xpath !== event.original.selector.xpath) &&
    !(
      lastEvent.original.element.tagName === 'label' &&
      lastEvent.original.element.attr.for === event.original.selector.id
    )
  ) return false;

  if (lastEvent.original.event === 'click' && event.original.event === 'change') return true;

  return false;
};

const createNewEvents = (events, event) => {
  const newEvents = events.slice(0, event.length - 1);

  return newEvents.concat([
    Object.assign(_.last(events), {show: false}),
    event,
  ]);
};

export default {
  state,
  getters,
  actions,
  mutations,
};
