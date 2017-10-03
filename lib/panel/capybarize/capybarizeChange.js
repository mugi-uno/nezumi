import * as selector from './selector';
import * as formatter from './formatter';

export const capybarizeChange = (data = {}) => {
  const element = data.element || {};
  const tag = (element.tagName || '').toLowerCase();

  switch (tag) {
    case 'input':
    case 'textarea':
      return capybarizeChangeInput(data);
    case 'select':
      return codeForChangeSelectBox(data);
    default:
      return null;
  }
};

export const capybarizeChangeInput = (data) => {
  const { locator, kind } = selector.toField(data);
  const value = formatter.formatTextValue((data.element && data.element.value) || '');

  switch ((data.element.attr.type || '').toLowerCase()) {
    case 'radio':
      return codeForChangeRadioButton(locator, kind);
    case 'checkbox':
      return codeForChangeCheckBox(locator, kind, data.element.checked);
    default:
      return codeForChangeInput(locator, kind, value);
  }
};
export const codeForChangeRadioButton = (locator, kind) => {
  if (kind === 'label' || kind === 'id') return `choose '${locator}'`;

  if (kind === 'xpath') return `find(:${kind}, '${locator}').set(true)`;

  return `find('${locator}').set(true)`;
};

export const codeForChangeCheckBox = (locator, kind, checked) => {
  const checkedCode = checked ? 'check' : 'uncheck';
  const checkedValue = checked ? 'true' : 'false';

  if (kind === 'label' || kind === 'id') return `${checkedCode} '${locator}'`;

  if (kind === 'xpath') return `find(:${kind}, '${locator}').set(${checkedValue})`;

  return `find('${locator}').set(${checkedValue})`;
};

export const codeForChangeInput = (locator, kind, value) => {
  if (kind === 'label' || kind === 'id') return `fill_in '${locator}', with: ${value}`;

  if (kind === 'xpath') return `find(:${kind}, '${locator}').set(${value})`;

  return `find('${locator}').set(${value})`;
};

export const codeForChangeSelectBox = (data) => {
  const { locator, kind, element } = selector.toField(data);
  const optionText = (element && element.optionText) || '';

  if (kind === 'label' || kind === 'id') return `select '${optionText}', from: '${locator}'`;

  if (kind === 'xpath') return `find(:${kind}, '${locator}').find(:option, '${optionText}').select_option`;

  return `find('${locator}').find(:option, '${optionText}').select_option`;
};
