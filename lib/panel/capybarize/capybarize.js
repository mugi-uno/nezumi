import { capybarizeClick } from './capybarizeClick';
import { capybarizeChange } from './capybarizeChange';
import { capybarizeSelectText } from './capybarizeSelectText';
import { capybarizeVisit } from './capybarizeVisit';

export const capybarize = (data = {}) => {
  switch (data.event) {
    case 'click':
      return capybarizeClick(data);
    case 'change':
      return capybarizeChange(data);
    case 'selectText':
      return capybarizeSelectText(data);
    case 'visit':
      return capybarizeVisit(data);
    default:
      return null;
  }
};
