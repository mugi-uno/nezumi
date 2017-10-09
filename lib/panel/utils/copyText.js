export default function copyText(text) {
  if (!text) return false;

  const dummy = document.createElement('textarea');
  dummy.style.cssText = 'position:absolute; top: -100%; left:-100%';
  dummy.value = text;

  document.body.appendChild(dummy);

  dummy.select();
  document.execCommand('copy');

  document.body.removeChild(dummy);

  return true;
}
