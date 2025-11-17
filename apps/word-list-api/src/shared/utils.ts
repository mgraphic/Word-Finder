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

export function istrue(value: unknown): boolean {
    if (typeof value === 'string') {
        return ['1', 'true', 'yes', 'y', 'on'].includes(value.toLowerCase());
    }

    return Boolean(value);
}

export function isHiliteRequested(url: string): boolean {
    const queryString = url.toLowerCase().split('?')[1]?.trim() || '';

    if (!queryString) {
        return false;
    }

    if (queryString.includes('hilite') && !queryString.includes('hilite=')) {
        return true;
    }

    const params = new URLSearchParams(queryString);

    if (params.has('hilite')) {
        return istrue(params.get('hilite'));
    }

    return false;
}

export function hiliteMatch(word: string, lookup: string): string {
    const lookupChars = getCharCountFromString(lookup.toLowerCase());
    let hilitedWord = '';

    for (const char of word) {
        // console.log(char);
        const lowerChar = char.toLowerCase();
        if (lookupChars[lowerChar] !== undefined) {
            lookupChars[lowerChar]--;
            if (lookupChars[lowerChar] < 0) {
                hilitedWord += `<mark>${char}</mark>`;
            } else {
                hilitedWord += char;
            }
        } else {
            hilitedWord += `<mark>${char}</mark>`;
        }
    }
    return hilitedWord;

    // const lookupChars = getCharCountFromString(lookup.toLowerCase());
    // console.log('lookupChars:', lookupChars);
    // console.log('word:', getCharCountFromString(word.toLowerCase()));
    // let hilitedWord = '';
    // const usedChars: CharCount = {};

    // for (const char of word) {
    //     const lowerChar = char.toLowerCase();
    //     const usedCount = usedChars[lowerChar] ?? 0;

    //     if (
    //         lookupChars[lowerChar] !== undefined &&
    //         usedCount < lookupChars[lowerChar]
    //     ) {
    //         hilitedWord += char;
    //         usedChars[lowerChar] = usedCount + 1;
    //     } else {
    //         hilitedWord += `<hilite>${char}</hilite>`;
    //     }
    // }

    // return hilitedWord;

    return word; // Placeholder implementation

    // const lookupChars = getCharCountFromString(lookup.toLowerCase());
    // let hilitedWord = '';
    // const usedChars: CharCount = {};

    // for (const char of word) {
    //     const lowerChar = char.toLowerCase();

    //     if (lookupChars[lowerChar] !== undefined) {
    //         const usedCount = usedChars[lowerChar] ?? 0;
    //         if (usedCount < lookupChars[lowerChar]) {
    //             hilitedWord += char;
    //             usedChars[lowerChar] = usedCount + 1;
    //         } else {
    //             hilitedWord += `<hilite>${char}</hilite>`;
    //         }
    //     } else {
    //         hilitedWord += `<hilite>${char}</hilite>`;
    //     }
    // }

    // return hilitedWord;

    // const lookupChars = getCharCountFromString(lookup.toLowerCase());
    // let hilitedWord = '';
    // const spentChars: CharCount = { '*': 0 };

    // for (const char of word) {
    //     const lowerChar = char.toLowerCase();

    //     if (lookupChars[lowerChar] !== undefined) {
    //         if ((spentChars[lowerChar] ?? 0) < lookupChars[lowerChar]) {
    //             hilitedWord += `<hilite>${char}</hilite>`;

    //             if (spentChars[lowerChar] === undefined) {
    //                 spentChars[lowerChar] = 0;
    //             }

    //             spentChars[lowerChar]++;
    //         } else {
    //             hilitedWord += char;
    //         }
    //     } else {
    //         hilitedWord += char;
    //     }
    // }

    // return hilitedWord;
}
