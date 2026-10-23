const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
const html = () => fs.readFileSync(path.join(root, 'index.html'), 'utf8');
test('QR card appears on website and retains current QR destination', () => {
  const source = html();
  assert.match(source, /id="site-qr"/);
  assert.match(source, /src="site-qr\.svg"/);
  assert.match(source, /https:\/\/salehahmadi12345\.github\.io\/tebkar-site\//);
});
test('original clinic information and links remain', () => {
  const source = html();
  ['+987733530535', '989924781772', '28.963858,50.837036',
   'id="guide"', 'id="hours"', 'id="faq"', 'id="contact"'].forEach(value => {
    assert.ok(source.includes(value), value);
  });
});
test('QR asset exists and has accessible label', () => {
  const svg = fs.readFileSync(path.join(root, 'site-qr.svg'), 'utf8');
  assert.match(svg, /viewBox="0 0 49 49"/);
  assert.match(svg, /aria-label=/);
});
test('AI reply service is not misrepresented as enabled', () => {
  const source = html();
  assert.doesNotMatch(source, /پاسخگوی هوشمند فعال است|پاسخ‌گوی خودکار فعال است/);
});