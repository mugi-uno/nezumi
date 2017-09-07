import $ from 'jquery';

import { emitter } from '../../emitter';
import { analyze } from '../utils/analyze';

export default class Base {
  hundler = (e) => {
    const analyzeResult = analyze(e.originalEvent.target);
    const eventName = this.eventName();

    emitter.emit('background.send', {
      type: 'fire',
      value: Object.assign({ event: eventName }, analyzeResult),
    });
  }

  on() {
    $(document).on(this.eventName(), this.hundler);
  }

  off() {
    $(document).off(this.eventName(), this.hundler);
  }

  eventName() {
    return '';
  }
}
