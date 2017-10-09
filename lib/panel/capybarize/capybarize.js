import { capybarizeClick } from './capybarizeClick';
import { capybarizeChange } from './capybarizeChange';
import { capybarizeSelectText } from './capybarizeSelectText';

export const capybarize = (data = {}) => {
  switch (data.event) {
    case 'click':
      return capybarizeClick(data);
    case 'change':
      return capybarizeChange(data);
    case 'selectText':
      return capybarizeSelectText(data);
    default:
      return null;
  }
};
