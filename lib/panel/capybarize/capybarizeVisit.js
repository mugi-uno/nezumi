export const capybarizeVisit = ({ path = '' } = {}) => [{
  kind: 'navi',
  code: `visit '${path}'`,
}];
