import $ from 'jquery';

import { emitter } from '../../emitter';
import { analyze } from '../utils/analyze';

export default class Base {
  preHandler = (e) => true;

  hundler = (e) => {
    if (!this.preHandler(e)) return;

    const analyzeResult = this.analyzeEvent(e);
    const eventName = this.eventName();

    emitter.emit('background.send', {
      type: 'fire',
      value: Object.assign({ event: eventName }, analyzeResult),
    });
  }

  analyzeEvent = (e) => analyze(e.originalEvent.target);

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
