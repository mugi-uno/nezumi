import { capybarizeClick } from './capybarizeClick';
import { capybarizeChange } from './capybarizeChange';

export const capybarize = (data = {}) => {
  switch (data.event) {
    case 'click':
      return capybarizeClick(data);
    case 'change':
      return capybarizeChange(data);
    default:
      return null;
  }
};
