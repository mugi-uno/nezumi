import createCodeList from './createCodeList';
import * as formatter from './formatter';

export const capybarizeChange = (data = {}) => {
  const element = data.element || {};
  const tag = element.tagName || '';

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
  switch (data.element.attr.type || '') {
    case 'radio':
      return codeForChangeRadioButton(data);
    case 'checkbox':
      return codeForChangeCheckBox(data);
    default:
      return codeForChangeInput(data);
  }
};

export const codeForChangeRadioButton = (data = {}) => {
  return createCodeList(data, [
    { kind: 'label', cb: (s) => `choose '${s}'` },
    { kind: 'id', cb: (s) => `choose '${s}'` },
    { kind: 'klass', cb: (s) => `find('${s}').set(true)` },
    { kind: 'xpath', cb: (s) => `find(:xpath, '${s}').set(true)` },
  ]);
};

export const codeForChangeCheckBox = (data = {}) => {
  const { element = {} } = data;
  const checked = element.checked;
  const checkedCode = checked ? 'check' : 'uncheck';
  const checkedValue = checked ? 'true' : 'false';

  return createCodeList(data, [
    { kind: 'label', cb: (s) => `${checkedCode} '${s}'` },
    { kind: 'id', cb: (s) => `${checkedCode} '${s}'` },
    { kind: 'klass', cb: (s) => `find('${s}').set(${checkedValue})` },
    { kind: 'xpath', cb: (s) => `find(:xpath, '${s}').set(${checkedValue})` },
  ]);
};

export const codeForChangeInput = (data = {}) => {
  const { element = {} } = data;
  const value = formatter.formatTextValue(element.value || '');

  return createCodeList(data, [
    { kind: 'label', cb: (s) => `fill_in '${s}', with: ${value}` },
    { kind: 'id', cb: (s) => `fill_in '${s}', with: ${value}` },
    { kind: 'klass', cb: (s) => `find('${s}').set(${value})` },
    { kind: 'xpath', cb: (s) => `find(:xpath, '${s}').set(${value})` },
  ]);
};

export const codeForChangeSelectBox = (data = {}) => {
  const { element = {} } = data;
  const optionText = element.optionText || '';

  return createCodeList(data, [
    { kind: 'label', cb: (s) => `select '${optionText}', from: '${s}'` },
    { kind: 'id', cb: (s) => `select '${optionText}', from: '${s}'` },
    { kind: 'klass', cb: (s) => `find('${s}').find(:option, '${optionText}').select_option` },
    { kind: 'xpath', cb: (s) => `find(:xpath, '${s}').find(:option, '${optionText}').select_option` },
  ]);
};
