import { readFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateWordsList(lang: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        readFile(
            path.resolve(__dirname, 'db', lang, 'words.db'),
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
