export const toDefault = ({ selector = {}, event = '' } = {}) => {
  const { id, klass, xpath } = selector;

  if (id) return { locator: id, kind: 'id' };
  if (klass) return { locator: klass, kind: 'klass' };
  return { locator: xpath, kind: 'xpath' };
};

export const toTextSelector = ({ element = {}, selector = {}, event = '' } = {}) => {
  const text = element.text || {};

  if (text.unique) return { locator: text.text, kind: 'text' };

  return toDefault({ selector, event });
};

export const toField = ({ selector = {}, event = '' } = {}) => {
  const { label } = selector;

  if (label) return { locator: label, kind: 'label' };

  return toDefault({ selector, event });
};
