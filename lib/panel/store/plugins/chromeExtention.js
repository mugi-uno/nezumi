import * as types from '../mutation-types';

export const chromeMessagingPlugin = (port) => (store) => {
  port.onMessage.addListener((msg) => {
    // example)
    //   location: 'content'
    //       type: 'update'
    //     commit: 'CONTENT_UPDATE'
    store.commit(`${msg.location}_${msg.type}`.toUpperCase(), msg.value);
  });

  store.subscribe((mutation, state) => {
    switch (mutation.type || '') {
      case types.CONTENT_CONNECT:
        port.postMessage(Object.assign({}, mutation, { payload: state.panel.watching }));
        break;
      case types.PANEL_TOGGLE_WATCHING:
        port.postMessage(mutation);
        break;
      default:
        // nothing to do;
    }
  });
};
