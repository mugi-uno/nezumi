import { escapeForRuby } from './formatter';

export const capybarizeSelectText = (data) => {
  const originalText = data.selectedText || '';
  const lines = originalText.split('\n');

  const code = () => {
    if (lines.length > 1) {
      const text = originalText.replace(/[\n]+/g, ' ');
      return `expect(page.text).to include('${escapeForRuby(text)}')`;
    } else {
      return `expect(page).to have_content('${escapeForRuby(originalText)}')`;
    }
  };

  return [{
    kind: 'matcher',
    code: code(),
  }];
};
