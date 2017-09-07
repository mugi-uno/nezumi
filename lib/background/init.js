import { emitter } from './emitter';

export default function() {
  connectToDevtool();
  connectToContent();
}

const connectToDevtool = () => {
  chrome.runtime.onConnect.addListener((port) => {
    if (port.name !== 'devtool') return;

    console.log('background <--> devtool connected.');

    const sendToDevtool = (store) => {
      console.log('background -> devtool', store);
      port.postMessage(store);
    };
    emitter.on('devtool.send', sendToDevtool);
    port.onDisconnect.addListener(() => emitter.removeListener('devtool.send', sendToDevtool));

    port.onMessage.addListener((msg) => {
      console.log('devtool -> background', msg);
      emitter.emit('devtool.receive', msg);
    });

    // pass to content
    port.onMessage.addListener((msg) => emitter.emit('content.send', Object.assign({ location: 'devtool' }, msg || {})));
  });
};

const connectToContent = () => {
  chrome.runtime.onConnect.addListener((port) => {
    if (port.name !== 'content') return;

    console.log('background <--> content connected.');

    const sendToContent = (store) => {
      console.log('background -> content', store);
      port.postMessage(store);
    };
    emitter.on('content.send', sendToContent);
    port.onDisconnect.addListener(() => emitter.removeListener('content.send', sendToContent));

    port.onMessage.addListener((msg) => {
      console.log('content -> background', msg);
      emitter.emit('content.receive', msg);
    });

    // pass to devtool
    port.onMessage.addListener((msg) => emitter.emit('devtool.send', Object.assign({ location: 'content' }, msg || {})));
  });
};
