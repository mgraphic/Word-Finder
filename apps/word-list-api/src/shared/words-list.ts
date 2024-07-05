import { readFile } from 'fs';
import path from 'path';

const dirname = new URL('.', import.meta.url).pathname;

function generateWordsList(lang: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        readFile(
            path.resolve(dirname, 'db', lang, 'words.db'),
            'utf8',
            (err, data: string) => {
                if (err) {
                    reject(err);
                    return;
                }

                const lines = data
                    .replace(/\r\n/g, '\n')
                    .replace(/\r/g, '\n')
                    .replace(/\t/g, '')
                    .split('\n');

                const wordsList = lines
                    .map((line) => line.trim())
                    .filter((line) => line !== '');

                resolve(wordsList);
            }
        );
    });
}

export const wordsList: string[] = await generateWordsList('en');
