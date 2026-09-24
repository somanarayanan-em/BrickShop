const STOP_WORDS = new Set([
  'a', 'an', 'and', 'for', 'in', 'of', 'on', 'the', 'to', 'with',
  'dollar', 'dollars', 'buck', 'bucks', 'set', 'sets', 'toy', 'toys',
  'product', 'products', 'priced', 'price', 'me', 'show', 'something',
  'kid', 'kids', 'please', 'looking'
]);

function emptyLimits() {
  return {
    priceMin: null,
    priceMax: null,
    ageMin: null,
    ageMax: null,
    theme: null
  };
}

function asNumber(value) {
  return Number(value);
}

function orderedPair(left, right) {
  return left <= right ? [left, right] : [right, left];
}

function take(source, pattern) {
  const match = source.text.match(pattern);
  if (!match) {
    return null;
  }
  source.text = source.text.replace(match[0], ' ').replace(/\s+/g, ' ').trim();
  return match;
}

function parseLimits(phrase) {
  const limits = emptyLimits();
  const source = { text: String(phrase ?? '').trim().replace(/\s+/g, ' ') };
  if (!source.text) {
    return limits;
  }

  let match = take(source, /between\s+(\d+(?:\.\d+)?)\s+and\s+(\d+(?:\.\d+)?)\s+years\s+old/i);
  if (match) {
    const [low, high] = orderedPair(asNumber(match[1]), asNumber(match[2]));
    limits.ageMin = low;
    limits.ageMax = high;
  }

  match = take(source, /(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s+years\s+old/i);
  if (match && limits.ageMin == null) {
    const [low, high] = orderedPair(asNumber(match[1]), asNumber(match[2]));
    limits.ageMin = low;
    limits.ageMax = high;
  }

  match = take(source, /(\d+(?:\.\d+)?)\s+years?\s+old/i);
  if (match && limits.ageMin == null) {
    limits.ageMin = asNumber(match[1]);
    limits.ageMax = limits.ageMin;
  }

  match = take(source, /between\s+ages?\s+(\d+(?:\.\d+)?)\s+and\s+(\d+(?:\.\d+)?)/i);
  if (match && limits.ageMin == null) {
    const [low, high] = orderedPair(asNumber(match[1]), asNumber(match[2]));
    limits.ageMin = low;
    limits.ageMax = high;
  }

  match = take(source, /\bages?\s+(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/i);
  if (match && limits.ageMin == null) {
    const [low, high] = orderedPair(asNumber(match[1]), asNumber(match[2]));
    limits.ageMin = low;
    limits.ageMax = high;
  }

  match = take(source, /\bages?\s+(\d+(?:\.\d+)?)\s+to\s+(\d+(?:\.\d+)?)/i);
  if (match && limits.ageMin == null) {
    const [low, high] = orderedPair(asNumber(match[1]), asNumber(match[2]));
    limits.ageMin = low;
    limits.ageMax = high;
  }

  match = take(source, /\bage\s+(\d+(?:\.\d+)?)/i);
  if (match && limits.ageMin == null) {
    limits.ageMin = asNumber(match[1]);
    limits.ageMax = limits.ageMin;
  }

  match = take(source, /\b(?:under|below|cheaper than|less than|no more than)\s+\$?(\d+(?:\.\d+)?)/i);
  if (match) {
    limits.priceMax = asNumber(match[1]);
  }

  match = take(source, /\b(?:over|above|more than)\s+\$?(\d+(?:\.\d+)?)/i);
  if (match) {
    limits.priceMin = asNumber(match[1]);
  }

  match = take(source, /\bat\s+least\s+\$?(\d+(?:\.\d+)?)/i);
  if (match && limits.priceMin == null) {
    limits.priceMin = asNumber(match[1]);
  }

  match = take(source, /\bbetween\s+\$?(\d+(?:\.\d+)?)\s+and\s+\$?(\d+(?:\.\d+)?)/i);
  if (match) {
    const [low, high] = orderedPair(asNumber(match[1]), asNumber(match[2]));
    limits.priceMin = low;
    limits.priceMax = high;
  }

  match = take(source, /(?:^|\s)\$?(\d+(?:\.\d+)?)\s*-\s*\$?(\d+(?:\.\d+)?)(?=\s|$)/i);
  if (match && limits.priceMin == null && limits.priceMax == null) {
    const [low, high] = orderedPair(asNumber(match[1]), asNumber(match[2]));
    limits.priceMin = low;
    limits.priceMax = high;
  }

  const theme = source.text
    .split(' ')
    .filter((word) => word && !STOP_WORDS.has(word.toLowerCase()))
    .join(' ')
    .trim();
  limits.theme = theme || null;
  return limits;
}

function ageOverlaps(storedAge, ageMin, ageMax) {
  const lowBound = ageMin == null || Number.isNaN(ageMin) ? null : ageMin;
  const highBound = ageMax == null || Number.isNaN(ageMax) ? null : ageMax;
  if (lowBound == null && highBound == null) {
    return false;
  }
  const stored = String(storedAge ?? '').trim().replace(/[–—]/g, '-');
  const phraseLow = lowBound == null ? 0 : lowBound;
  const phraseHigh = highBound == null ? Infinity : highBound;
  const range = stored.match(/^(\d+)\s*-\s*(\d+)$/);
  if (range) {
    const low = asNumber(range[1]);
    const high = asNumber(range[2]);
    return phraseLow <= high && phraseHigh >= low;
  }
  const plus = stored.match(/^(\d+)\s*\+$/);
  if (plus) {
    return phraseHigh >= asNumber(plus[1]);
  }
  return false;
}

function hasLimits(limits) {
  return limits.priceMin != null
    || limits.priceMax != null
    || limits.ageMin != null
    || limits.ageMax != null
    || Boolean(limits.theme);
}

function escapeTheme(theme) {
  return String(theme).replace(/[\\%_]/g, (ch) => `\\${ch}`);
}

function formatLimits(limits) {
  const parts = [];
  if (limits.theme) {
    parts.push(limits.theme);
  }
  if (limits.priceMin != null && limits.priceMax != null) {
    parts.push(`$${limits.priceMin}–$${limits.priceMax}`);
  } else if (limits.priceMax != null) {
    parts.push(`up to $${limits.priceMax}`);
  } else if (limits.priceMin != null) {
    parts.push(`$${limits.priceMin} and up`);
  }
  if (limits.ageMin != null && limits.ageMax != null && limits.ageMin !== limits.ageMax) {
    parts.push(`ages ${limits.ageMin}–${limits.ageMax}`);
  } else if (limits.ageMin != null && limits.ageMax != null) {
    parts.push(`age ${limits.ageMin}`);
  } else if (limits.ageMin != null) {
    parts.push(`ages ${limits.ageMin}+`);
  } else if (limits.ageMax != null) {
    parts.push(`up to age ${limits.ageMax}`);
  }
  return parts.join(', ');
}

function pageAfterAge(rows, limits, offset, pageSize) {
  const hasAge = limits.ageMin != null || limits.ageMax != null;
  const filtered = hasAge
    ? rows.filter((row) => ageOverlaps(row.p_age, limits.ageMin, limits.ageMax))
    : rows;
  return {
    products: filtered.slice(offset, offset + pageSize),
    total: filtered.length
  };
}

function isClosedGrammar(line) {
  const text = String(line ?? '').trim();
  if (!text) {
    return false;
  }
  const limits = parseLimits(text);
  const hasBound = limits.priceMin != null
    || limits.priceMax != null
    || limits.ageMin != null
    || limits.ageMax != null;
  if (hasBound) {
    return true;
  }
  if (/\d/.test(text)) {
    return false;
  }
  return Boolean(limits.theme);
}

function parsePhrase(phrase, rewriter) {
  if (typeof rewriter !== 'function') {
    return parseLimits(phrase);
  }
  return applyRewrite(phrase, rewriter);
}

function numbersIn(text) {
  return [...String(text).matchAll(/\d+(?:\.\d+)?/g)].map((match) => match[0]);
}

function rewriteKeepsNumbers(original, line) {
  const source = new Set(numbersIn(original));
  return numbersIn(line).every((value) => source.has(value));
}

function directionAgrees(original, limits) {
  const text = String(original).toLowerCase();
  const wantsMax = /\b(cheaper than|less than|no more than|below|under)\b/.test(text);
  const wantsMin = /\b(more than|at least|above|over)\b/.test(text);
  const wantsAge = /\b(year old|years old|aged|ages?)\b/.test(text);
  if (wantsMax && limits.priceMax == null) {
    return false;
  }
  if (wantsMin && limits.priceMin == null) {
    return false;
  }
  if (wantsAge && limits.ageMin == null) {
    return false;
  }
  return true;
}

function rewriteKeepsThemeWords(original, line) {
  const rewritten = String(line).toLowerCase();
  const words = String(original).toLowerCase().split(/[^a-z0-9]+/).filter((word) => {
    return word && !STOP_WORDS.has(word) && !/^\d+(?:\.\d+)?$/.test(word);
  });
  const cues = new Set(['cheaper', 'less', 'more', 'under', 'over', 'above', 'below', 'least', 'aged', 'age', 'ages', 'year', 'years', 'old', 'between', 'than', 'no']);
  return words.filter((word) => !cues.has(word)).every((word) => rewritten.includes(word));
}

async function applyRewrite(phrase, rewriter) {
  try {
    const line = await rewriter(phrase);
    if (isClosedGrammar(line) && rewriteKeepsNumbers(phrase, line) && rewriteKeepsThemeWords(phrase, line)) {
      const limits = parseLimits(line);
      if (directionAgrees(phrase, limits)) {
        return limits;
      }
    }
  } catch (err) {
    console.error('Phrase rewrite failed');
  }
  return parseLimits(phrase);
}

const path = require('path');
const MODEL_ID = 'onnx-community/Qwen2.5-1.5B-Instruct';
let generatorPromise = null;

function getGenerator() {
  if (!generatorPromise) {
    const { pipeline, env } = require('@huggingface/transformers');
    env.cacheDir = process.env.TRANSFORMERS_CACHE
      || path.join(__dirname, '..', '.cache', 'transformers');
    env.allowLocalModels = true;
    if (process.env.TRANSFORMERS_OFFLINE === '1') {
      env.allowRemoteModels = false;
    }
    generatorPromise = pipeline('text-generation', MODEL_ID, { dtype: 'q4' });
  }
  return generatorPromise;
}

async function rewritePhrase(phrase, categories) {
  const generator = await getGenerator();
  const names = (categories || []).filter(Boolean).join(', ');
  const system = [
    'Return JSON only: {"priceMin":null,"priceMax":null,"ageMin":null,"ageMax":null,"theme":null}.',
    'Put a maximum price in priceMax and a minimum price in priceMin.',
    'Put a maximum age in ageMax and a minimum age in ageMin.',
    'under age means ageMax. below a price means priceMax.',
    'between two ages means both age fields. between two prices means both price fields.',
    `Correct theme spelling to one of: ${names || 'none'}.`,
    'If no theme, null. kids is null.'
  ].join(' ');
  const output = await generator([
    { role: 'system', content: system },
    { role: 'user', content: String(phrase) }
  ], { max_new_tokens: 90, do_sample: false });
  const text = output[0].generated_text;
  const last = Array.isArray(text) ? text[text.length - 1].content : text;
  return String(last || '');
}

function editDistance(left, right) {
  const a = String(left);
  const b = String(right);
  const rows = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j += 1) {
    rows[0][j] = j;
  }
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      rows[i][j] = Math.min(rows[i - 1][j] + 1, rows[i][j - 1] + 1, rows[i - 1][j - 1] + cost);
    }
  }
  return rows[a.length][b.length];
}

function numbersInPhrase(text) {
  return new Set([...String(text).matchAll(/\d+(?:\.\d+)?/g)].map((match) => String(Number(match[0]))));
}

function asFieldNumber(value, allowed) {
  if (value == null) {
    return null;
  }
  const match = String(value).match(/\d+(?:\.\d+)?/);
  if (!match) {
    return null;
  }
  const number = Number(match[0]);
  if (!allowed.has(String(number))) {
    return null;
  }
  return number;
}

function parseModelJson(text) {
  const match = String(text || '').match(/\{[\s\S]*\}/);
  if (!match) {
    return null;
  }
  try {
    return JSON.parse(match[0]);
  } catch (err) {
    return null;
  }
}

function canonicalTheme(theme, categories) {
  const text = String(theme || '').trim().toLowerCase();
  if (!text || ['kids', 'kid', 'toy', 'toys', 'children', 'child', 'none', 'null'].includes(text)) {
    return null;
  }
  const names = (categories || []).filter(Boolean);
  const exact = names.find((name) => name.toLowerCase() === text);
  if (exact) {
    return exact;
  }
  const contained = names.find((name) => name.toLowerCase().split(/[^a-z0-9]+/).includes(text));
  return contained || null;
}

function snapTheme(phrase, categories) {
  const tokens = String(phrase).toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length >= 4);
  let best = null;
  let bestScore = 3;
  (categories || []).filter(Boolean).forEach((name) => {
    const parts = name.toLowerCase().split(/[^a-z0-9]+/).filter((part) => part.length >= 4);
    tokens.forEach((token) => {
      parts.forEach((part) => {
        const score = editDistance(token, part);
        if (score < bestScore) {
          bestScore = score;
          best = name;
        }
      });
    });
  });
  return bestScore <= 2 ? best : null;
}

function correctSlots(phrase, limits) {
  const text = String(phrase).toLowerCase();
  if (/\bunder age\b/.test(text) && limits.ageMin != null && (limits.ageMax == null || limits.ageMax === limits.ageMin)) {
    limits.ageMax = limits.ageMin;
    limits.ageMin = null;
  }
  const priceCeiling = /\b(below|cheaper|less than|no more than)\b/.test(text)
    || (/\bunder\b/.test(text) && !/\bunder age\b/.test(text));
  if (priceCeiling && limits.priceMin != null && limits.priceMax == null) {
    limits.priceMax = limits.priceMin;
    limits.priceMin = null;
  }
  return limits;
}

async function understandPhrase(phrase, categories, ask) {
  const names = (categories || []).map((category) => category.p_category || category).filter(Boolean);
  const limits = emptyLimits();
  try {
    const raw = await (ask || rewritePhrase)(phrase, names);
    const parsed = parseModelJson(raw);
    if (parsed) {
      const allowed = numbersInPhrase(phrase);
      limits.priceMin = asFieldNumber(parsed.priceMin, allowed);
      limits.priceMax = asFieldNumber(parsed.priceMax, allowed);
      limits.ageMin = asFieldNumber(parsed.ageMin, allowed);
      limits.ageMax = asFieldNumber(parsed.ageMax, allowed);
      limits.theme = canonicalTheme(parsed.theme, names);
      correctSlots(phrase, limits);
    }
  } catch (err) {
    console.error('Phrase rewrite failed');
  }
  const fallback = parseLimits(phrase);
  ['priceMin', 'priceMax', 'ageMin', 'ageMax'].forEach((key) => {
    if (limits[key] == null) {
      limits[key] = fallback[key];
    }
  });
  if (!limits.theme) {
    limits.theme = snapTheme(phrase, names);
  }
  return correctSlots(phrase, limits);
}

module.exports = {
  parsePhrase,
  ageOverlaps,
  hasLimits,
  escapeTheme,
  formatLimits,
  pageAfterAge,
  rewritePhrase,
  understandPhrase,
  isClosedGrammar
};
