import { ContainsMatchRequest, CharCount } from './model';
import { wordsList } from './words-list';

export function wordMatchSearch(word: string): string[] {
    while (word.includes('**')) {
        word = word.replace('**', '*');
    }

    const escaped = escapeRegExp(word, ['*', '_'])
        .replaceAll('*', '.*')
        .replaceAll('_', '.');
    const expression = new RegExp(`^${escaped}$`, 'i');

    return wordsList.filter((x) => x.match(expression));
}

export function wordContainsMatchSearch(
    options: ContainsMatchRequest
): string[] {
    const { startsWith, contains, endsWith } = options;
    const parts: string[] = [];

    if (startsWith) {
        parts.push(`^${escapeRegExp(startsWith)}`);
    }

    if (contains) {
        parts.push(escapeRegExp(contains));
    }

    if (endsWith) {
        parts.push(`${escapeRegExp(endsWith)}$`);
    }

    const expression = new RegExp(parts.join('.*'), 'i');

    return wordsList.filter((x) => x.match(expression));
}

export function charMatchSearch(lookup: string): string[] {
    const lookupLength = lookup.length;
    const lookupChars = getCharCountFromString(lookup.toLowerCase());
    const matching: string[] = [];

    for (const word of wordsList) {
        if (word.length > lookupLength) {
            continue;
        }

        let pass = true;
        const wordChars: CharCount = getCharCountFromString(word.toLowerCase());
        const spentChars: CharCount = { '*': 0 };

        for (const key of Object.keys(wordChars)) {
            spentChars[key] = wordChars[key];

            if (lookupChars[key] !== undefined) {
                if (wordChars[key] > lookupChars[key]) {
                    spentChars[key] = lookupChars[key];
                    spentChars['*'] += wordChars[key] - lookupChars[key];
                } else {
                    spentChars[key] = wordChars[key];
                }

                if (spentChars[key] > lookupChars[key]) {
                    pass = false;
                    break;
                }
            } else {
                spentChars['*'] += wordChars[key];
            }

            if (spentChars['*'] > (lookupChars['*'] ?? 0)) {
                pass = false;
                break;
            }
        }

        if (pass) {
            matching.push(word);
        }
    }

    return matching;
}

export function getCharCountFromString(str: string): CharCount {
    const chars: CharCount = {};

    for (const key of [...str]) {
        if (chars[key] === undefined) {
            chars[key] = 0;
        }

        chars[key]++;
    }

    return chars;
}

export function escapeRegExp(text: string, ignore: string[] = []): string {
    const rec = [
        '-',
        '[',
        ']',
        '{',
        '}',
        '(',
        ')',
        '*',
        '+',
        '?',
        '.',
        ',',
        '\\',
        '^',
        '$',
        '|',
        '#',
        '!',
        '\\s',
    ].filter((x) => !ignore.includes(x));
    const expression = new RegExp(
        `[${rec.join('').replaceAll(']', '\\]')}]`,
        'g'
    );

    return text.replaceAll(expression, '\\$&');
}
