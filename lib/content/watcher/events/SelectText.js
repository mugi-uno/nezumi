import $ from 'jquery';
import Base from './Base';

export default class SelectText extends Base {
  preHandler = (e) => {
    const text = window.getSelection().toString();
    return !!text;
  }

  analyzeEvent = () => ({
    selectedText: window.getSelection().toString(),
  });  

  on() {
    $('body').on('mouseup', this.hundler);
  }

  off() {
    $('body').off('mouseup', this.hundler);
  }


  eventName() {
    return 'selectText';
  }
}
