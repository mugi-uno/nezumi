import _ from 'lodash';
import elementXpath from 'element-xpath';

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
    tagName: element.tagName,
    value: element.value,
    text: analyzeText(element),
    checked: element.checked,
    optionText: analyzeSelectOption(element),
    attr: {
      type: element.getAttribute('type'),
    },
  };
};

export const analyzeSelector = (element) => {
  const xpath = elementXpath(element);
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

  if (document.querySelectorAll(classSelector).length === 1) {
    return classSelector;
  } else {
    return '';
  }
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

  if (!(tag === 'a' || tag === 'button')) return { text: '', unique: false };

  const text = element.innerText;
  const allTags = [...document.getElementsByTagName(tag)];
  const unique = allTags.filter(t => t.textContent === text).length === 1;

  return { text, unique };
};

export const analyzeSelectOption = (element) => {
  if (!element.options || !element.options.length) return '';

  return element.options[element.selectedIndex].innerText;
};
