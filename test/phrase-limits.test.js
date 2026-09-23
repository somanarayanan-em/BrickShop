const test = require('node:test');
const assert = require('node:assert/strict');
const { parsePhrase, ageOverlaps, escapeTheme, pageAfterAge } = require('../lib/phrase-limits');

function limitsOf(phrase) {
  return parsePhrase(phrase);
}

test('under 50 sets priceMax to 50', () => {
  const limits = limitsOf('under 50');
  assert.equal(limits.priceMax, 50);
  assert.equal(limits.priceMin, null);
});

test('over 50 sets priceMin to 50', () => {
  const limits = limitsOf('over 50');
  assert.equal(limits.priceMin, 50);
  assert.equal(limits.priceMax, null);
});

test('between 10 and 50 sets both bounds', () => {
  const limits = limitsOf('between 10 and 50');
  assert.equal(limits.priceMin, 10);
  assert.equal(limits.priceMax, 50);
});

test('between 50 and 10 orders the pair', () => {
  const limits = limitsOf('between 50 and 10');
  assert.equal(limits.priceMin, 10);
  assert.equal(limits.priceMax, 50);
});

test('between 5 and 12 is a price bound', () => {
  const limits = limitsOf('between 5 and 12');
  assert.equal(limits.priceMin, 5);
  assert.equal(limits.priceMax, 12);
  assert.equal(limits.ageMin, null);
});

test('5-12 is a price bound', () => {
  const limits = limitsOf('5-12');
  assert.equal(limits.priceMin, 5);
  assert.equal(limits.priceMax, 12);
  assert.equal(limits.ageMin, null);
});

test('under 9.99 accepts a decimal amount', () => {
  const limits = limitsOf('under 9.99');
  assert.equal(limits.priceMax, 9.99);
});

test('ages 5-12 sets an age range', () => {
  const limits = limitsOf('ages 5-12');
  assert.equal(limits.ageMin, 5);
  assert.equal(limits.ageMax, 12);
  assert.equal(limits.priceMin, null);
});

test('8 years old sets a single age', () => {
  const limits = limitsOf('8 years old');
  assert.equal(limits.ageMin, 8);
  assert.equal(limits.ageMax, 8);
});

test('between 5 and 12 years old sets an age range', () => {
  const limits = limitsOf('between 5 and 12 years old');
  assert.equal(limits.ageMin, 5);
  assert.equal(limits.ageMax, 12);
  assert.equal(limits.priceMin, null);
});

test('5-12 years old sets an age range', () => {
  const limits = limitsOf('5-12 years old');
  assert.equal(limits.ageMin, 5);
  assert.equal(limits.ageMax, 12);
  assert.equal(limits.priceMin, null);
});

test('age 8 overlaps stored 6-12', () => {
  assert.equal(ageOverlaps('6-12', 8, 8), true);
});

test('ages 5-12 overlap stored 6-12 and 12+', () => {
  assert.equal(ageOverlaps('6-12', 5, 12), true);
  assert.equal(ageOverlaps('12+', 5, 12), true);
});

test('ages 5-8 do not overlap stored 12+', () => {
  assert.equal(ageOverlaps('12+', 5, 8), false);
});

test('a blank stored age does not overlap', () => {
  assert.equal(ageOverlaps('', 8, 8), false);
  assert.equal(ageOverlaps('all ages', 5, 12), false);
});

test('red colored toy returns no price or age bounds', () => {
  const limits = limitsOf('red colored toy');
  assert.equal(limits.priceMin, null);
  assert.equal(limits.priceMax, null);
  assert.equal(limits.ageMin, null);
  assert.equal(limits.ageMax, null);
});

test('a spaces-only phrase returns no bounds', () => {
  const limits = limitsOf('   ');
  assert.equal(limits.priceMin, null);
  assert.equal(limits.priceMax, null);
  assert.equal(limits.ageMin, null);
  assert.equal(limits.ageMax, null);
  assert.equal(limits.theme, null);
});

test('age filter runs before the 20-row page cut', () => {
  const rows = [];
  for (let i = 0; i < 20; i += 1) {
    rows.push({ p_id: i, p_age: '12+' });
  }
  rows.push({ p_id: 99, p_age: '6-12' });
  const page = pageAfterAge(rows, { ageMin: 6, ageMax: 8 }, 0, 20);
  assert.equal(page.total, 1);
  assert.equal(page.products.length, 1);
  assert.equal(page.products[0].p_id, 99);
});

test('theme wildcards are escaped', () => {
  assert.equal(escapeTheme('100%_ninja\\go'), '100\\%\\_ninja\\\\go');
});

test('Ninjago between 10 and 50 for ages 5-12 returns all three bounds', () => {
  const limits = limitsOf('Ninjago between 10 and 50 for ages 5-12');
  assert.equal(limits.theme, 'Ninjago');
  assert.equal(limits.priceMin, 10);
  assert.equal(limits.priceMax, 50);
  assert.equal(limits.ageMin, 5);
  assert.equal(limits.ageMax, 12);
});
