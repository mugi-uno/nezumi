const createCodeList = ({ selector = {}, element = {} } = {}, list = []) => (
  list.reduce((result, value) => {
    const s = value.kind === 'text'
      ? extractTextSelector(element)
      : selector[value.kind];

    if (!s) return result;

    return result.concat([{
      kind: value.kind,
      code: value.cb(s),
    }]);
  }, [])
);

const extractTextSelector = (element) => {
  const textValue = element.text = {};
  return textValue.unique ? textValue.text : '';
};

export default createCodeList;
