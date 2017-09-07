import _ from 'lodash';

export const capybarize = (data = {}) => {
  const element = data.element || {};
  const tag = (element.tagName || '').toLowerCase();

  switch (tag) {
    case 'a':
    case 'button':
      return capybarizeLinkOrButton(data, tag);
    case 'input':
    case 'textarea':
      return capybarizeField(data);
    case 'select':
      return capybarizeSelectBox(data);
    default:
      return null;
  }
};

export const capybarizeField = (data = {}) => {
  switch (data.event) {
    case 'click':
      return capybarizeClick(data);
    case 'change':
      return capybarizeChange(data);
    default:
      return null;
  }
};

export const capybarizeLinkOrButton = (data = {}, tag) => {
  switch (data.event) {
    case 'click':
      return capybarizeClickLinkOrButton(data, tag);
    default:
      return null;
  }
};

export const capybarizeSelectBox = (data = {}) => {
  const { locator, kind } = getCapybaraFieldSelector(data);

  switch (data.event) {
    case 'change':
      return capybarizeChangeSelectBox(locator, kind, data.element.optionText || '');
    default:
      return null;
  }
};

export const capybarizeClick = (data) => {
  const { locator, kind } = getCapybaraSelector(data);

  if (kind === 'id') return `find_by_id('${locator}').click`;

  if (kind === 'xpath') return `find(:${kind}, '${locator}').click`;

  return `find('${locator}').click`;
};

export const capybarizeClickLinkOrButton = (data, tag) => {
  const method = {
    'a': 'click_link',
    'button': 'click_button',
  }[tag];

  if (!method) return null;

  const { locator, kind } = getCapybaraLinkOrButtonSelector(data);

  if (kind === 'text' || kind === 'id') return `${method} '${locator}'`;

  if (kind === 'xpath') return `find(:${kind}, '${locator}').click`;

  return `find('${locator}').click`;
};

export const capybarizeChange = (data) => {
  const { locator, kind } = getCapybaraFieldSelector(data);
  const value = formatTextValue((data.element && data.element.value) || '');

  switch ((data.element.attr.type || '').toLowerCase()) {
    case 'radio':
      return capybarizeChangeRadioButton(locator, kind);
    case 'checkbox':
      return capybarizeChangeCheckBox(locator, kind, data.element.checked);
    default:
      return capybarizeChangeInput(locator, kind, value);
  }
};

export const capybarizeChangeRadioButton = (locator, kind) => {
  if (kind === 'label' || kind === 'id') return `choose '${locator}'`;

  if (kind === 'xpath') return `find(:${kind}, '${locator}').set(true)`;

  return `find('${locator}').set(true)`;
};

export const capybarizeChangeCheckBox = (locator, kind, checked) => {
  const checkedCode = checked ? 'check' : 'uncheck';
  const checkedValue = checked ? 'true' : 'false';

  if (kind === 'label' || kind === 'id') return `${checkedCode} '${locator}'`;

  if (kind === 'xpath') return `find(:${kind}, '${locator}').set(${checkedValue})`;

  return `find('${locator}').set(${checkedValue})`;
};

export const capybarizeChangeSelectBox = (locator, kind, optionText) => {
  if (kind === 'label' || kind === 'id') return `select '${optionText}', from: '${locator}'`;

  if (kind === 'xpath') return `find(:${kind}, '${locator}').find(:option, '${optionText}').select_option`;

  return `find('${locator}').find(:option, '${optionText}').select_option`;
};

export const capybarizeChangeInput = (locator, kind, value) => {
  if (kind === 'label' || kind === 'id') return `fill_in '${locator}', with: ${value}`;

  if (kind === 'xpath') return `find(:${kind}, '${locator}').set(${value})`;

  return `find('${locator}').set(${value})`;
};

const getCapybaraSelector = ({ selector = {}, event = '' } = {}) => {
  const { id, klass, xpath } = selector;

  if (id) return { locator: id, kind: 'id' };
  if (klass) return { locator: klass, kind: 'klass' };
  return { locator: xpath, kind: 'xpath' };
};

const getCapybaraLinkOrButtonSelector = ({ element = {}, selector = {}, event = '' } = {}) => {
  const text = element.text || {};

  if (text.unique) return { locator: text.text, kind: 'text' };

  return getCapybaraSelector({ selector, event });
};

const getCapybaraFieldSelector = ({ selector = {}, event = '' } = {}) => {
  const { label } = selector;

  if (label) return { locator: label, kind: 'label' };

  return getCapybaraSelector({ selector, event });
};

const formatTextValue = (value = '') => {
  const allLine = value.split(/\r\n|\r|\n/);

  if (allLine.length === 1) {
    return `'${allLine[0]}'`;
  }

  return `"${_.join(allLine, '\\n')}"`;
};
