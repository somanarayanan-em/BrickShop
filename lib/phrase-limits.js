const STOP_WORDS = new Set(['a', 'an', 'and', 'for', 'in', 'of', 'on', 'the', 'to', 'with']);

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

function parsePhrase(phrase) {
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

  match = take(source, /(\d+(?:\.\d+)?)\s+years\s+old/i);
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

  match = take(source, /\b(?:under|below)\s+\$?(\d+(?:\.\d+)?)/i);
  if (match) {
    limits.priceMax = asNumber(match[1]);
  }

  match = take(source, /\b(?:over|above)\s+\$?(\d+(?:\.\d+)?)/i);
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
  if (ageMin == null || Number.isNaN(ageMin)) {
    return false;
  }
  const stored = String(storedAge ?? '').trim().replace(/[–—]/g, '-');
  const phraseHigh = ageMax == null ? Infinity : ageMax;
  const range = stored.match(/^(\d+)\s*-\s*(\d+)$/);
  if (range) {
    const low = asNumber(range[1]);
    const high = asNumber(range[2]);
    return ageMin <= high && phraseHigh >= low;
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
  }
  return parts.join(', ');
}

function pageAfterAge(rows, limits, offset, pageSize) {
  const filtered = limits.ageMin == null
    ? rows
    : rows.filter((row) => ageOverlaps(row.p_age, limits.ageMin, limits.ageMax));
  return {
    products: filtered.slice(offset, offset + pageSize),
    total: filtered.length
  };
}

module.exports = {
  parsePhrase,
  ageOverlaps,
  hasLimits,
  escapeTheme,
  formatLimits,
  pageAfterAge
};
