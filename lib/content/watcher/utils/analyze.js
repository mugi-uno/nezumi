import _ from 'lodash';
import * as xpathUtils from './xpath';

export const analyze = (element) => {
  const elementInfo = analyzeElement(element);
  const selector = analyzeSelector(element);

  return {
    element: elementInfo,
    selector,
  };
};

export const analyzeElement = (element) => {
  return {
    tagName: element.tagName.toLowerCase(),
    value: element.value,
    text: analyzeText(element),
    checked: element.checked,
    optionText: analyzeSelectOption(element),
    attr: {
      type: (element.getAttribute('type') || '').toLowerCase(),
      for: (element.getAttribute('for') || '').toLowerCase(),
    },
  };
};

export const analyzeSelector = (element) => {
  const xpath = xpathUtils.analyze(element);
  const label = analyzeLabel(element);
  const id = analyzeId(element);
  const klass = analyzeClass(element);

  return {
    label,
    id,
    klass,
    xpath,
  };
};

export const analyzeId = (element) => {
  return element.id || '';
};

export const analyzeClass = (element) => {
  const classList = element.classList;
  if (_.isEmpty(classList)) return '';

  const classSelector = '.' + _.join(classList, '.');

  if (isUnique(classSelector)) {
    return classSelector;
  }

  const parentId = gerNearestParentId(element);
  const nestSelector = `#${parentId} ${classSelector}`;

  if (parentId && isUnique(nestSelector)) {
    return nestSelector;
  }

  return '';
};

export const analyzeLabel = (element) => {
  const id = element.id;
  if (!id) return '';

  const label = document.querySelector(`label[for=${id}]`);

  if (label) {
    return label.innerText || '';
  } else {
    return '';
  }
};

export const analyzeText = (element) => {
  const tag = element.tagName.toLowerCase();

  const text = element.innerText;
  const allTags = [...document.getElementsByTagName(tag)];
  const unique = allTags.filter(t => t.textContent === text).length === 1;

  return { text, unique };
};

export const analyzeSelectOption = (element) => {
  if (!element.options || !element.options.length) return '';

  return element.options[element.selectedIndex].innerText;
};

export const gerNearestParentId = (element) => {
  const parent = element.closest('[id]');

  if (!parent) return '';

  return parent.id;
};

export const isUnique = (selector) => {
  return document.querySelectorAll(selector).length === 1;
};
