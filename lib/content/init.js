import { emitter } from './emitter';
import { watcher } from './watcher/Watcher';
import * as devtoolMutationTypes from '../panel/store/mutation-types';

const devtoolHandler = (msg) => {
  switch (msg.type) {
    case devtoolMutationTypes.CONTENT_CONNECT:
    case devtoolMutationTypes.PANEL_TOGGLE_WATCHING:
      watcher.toggle(msg.payload);
      break;
    default:
      // nothing to do;
  }
};

const backgroundHandler = (msg) => {
  // nothing to do.  
};

export default function() {
  emitter.on('background.receive', (msg) => {
    switch (msg.location) {
      case 'devtool':
        devtoolHandler(msg);
        break;
      case 'background':
        backgroundHandler(msg);
        break;
      default:
        // nothing to do.
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const port = chrome.runtime.connect({name: 'content'});

    const sendToBackground = (store) => {
      console.log('content -> background', store);
      port.postMessage(store);
    };
    emitter.on('background.send', sendToBackground);
    port.onDisconnect.addListener(() => emitter.removeListener('background.send', sendToBackground));

    port.onMessage.addListener((msg) => {
      console.log('background -> content', msg);
      emitter.emit('background.receive', msg);
    });

    emitter.emit('background.send', { type: 'connect' });
  });
}
