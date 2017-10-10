import _ from 'lodash';
import createCodeList from './createCodeList';

export const capybarizeClick = (data) => {
  const element = data.element || {};
  const tag = element.tagName || '';

  switch (tag) {
    case 'a':
    case 'button':
      return codeForClickLinkOrButton(data, tag);
    default:
      return codeForClick(data, tag);
  }
};

export const codeForClickLinkOrButton = (data = {}, tag) => {
  const method = {
    'a': 'click_link',
    'button': 'click_button',
  }[tag];

  if (!method) return null;

  return createCodeList(data, [
    { kind: 'text', cb: (s) => `${method} '${s}'` },
    { kind: 'id', cb: (s) => `${method} '${s}'` },
    { kind: 'klass', cb: (s) => `find('${s}').click` },
    { kind: 'xpath', cb: (s) => `find(:xpath, '${s}').click` },
  ]);
};

export const codeForClick = (data, tag) => {
  return createCodeList(data, [
    { kind: 'text', cb: (s) => `find('${tag}', text: /\\A${_.escapeRegExp(s)}\\z/).click` },
    { kind: 'id', cb: (s) => `find_by_id('${s}').click` },
    { kind: 'klass', cb: (s) => `find('${s}').click` },
    { kind: 'xpath', cb: (s) => `find(:xpath, '${s}').click` },
  ]);
};
