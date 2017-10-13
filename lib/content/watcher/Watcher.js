import _ from 'lodash';
import events from './events';
import { emitter } from '../emitter';

class Watcher {
  constructor() {
    this.watching = false;
    this.events = _.map(events, EventClass => new EventClass());
  }

  on() {
    if (this.watching) return;
    this.watching = true;
    this.events.forEach(e => e.on());

    console.log('[🐭nezumi] 👀watching start.');

    emitter.emit('background.send', {
      type: 'fire',
      value: { event: 'visit', path: `${window.location.pathname}${window.location.search}` },
    });
  }

  off() {
    this.watching = false;
    this.events.forEach(e => e.off());

    console.log('[🐭nezumi] 💤watching stop.');
  }

  toggle(newWatchingValue = !this.watching) {
    if (newWatchingValue) {
      this.on();
    } else {
      this.off();
    }
  }
}

// export singleton watcher
export const watcher = new Watcher();
