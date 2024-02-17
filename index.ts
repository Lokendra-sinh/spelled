import * as fs from 'fs';

import * as readline from 'readline';

// Create readline interface for input/output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function readDictionary(filename: string): Promise<string[]> {
    try {
        const data = await fs.promises.readFile(filename, 'utf-8');
        const dictionary = data.split('\n').map(word => word.trim());
        return dictionary;
    } catch (err) {
        console.error('Error reading file:', err);
        return [];
    }
}

function getStringEditDistance(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;
    const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));
    for (let i = 0; i <= len1; i++) {
        for (let j = 0; j <= len2; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[len1][len2];
}

async function main() {
    try {
        const filename = 'words.txt';
        const dictionary = await readDictionary(filename);
        
        let inputWord: string = 'test';
        while (inputWord !== 'exit') {
            inputWord = await new Promise<string>((resolve) => {
                rl.question('Type a word to check? ', (answer) => {
                    resolve(answer.trim());
                });
            });

            if (!inputWord) {
                console.log('No input word provided');
                continue;
            }
            if (inputWord === 'exit') {
                break;
            }
            if (dictionary.includes(inputWord!)) {
                console.log('The word is in the dictionary');
                continue;
            }
            const sortedDictionary = dictionary.map(word => ({
                word,
                score: getStringEditDistance(inputWord!, word)
            })).sort((a, b) => a.score - b.score);
            const top10Suggestions = sortedDictionary.slice(0, 10).map(item => item.word);
            console.log('Suggestions:', top10Suggestions);
        }
        console.log('Exiting...');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        rl.close();
    }
}

main();