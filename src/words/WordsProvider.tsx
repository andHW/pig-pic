import { createContext, useEffect, useState } from 'react';
import easyWords from '/src/assets/words/easy.txt'
import mediumWords from '/src/assets/words/medium.txt';
import hardWords from '/src/assets/words/hard.txt';
import veryHardWords from '/src/assets/words/very-hard.txt';
import { Difficulty } from './Difficulty';

type WordsContextType = {
  wordsContents: Record<Difficulty, string[]>;
  genRandomWord: (difficulty: Difficulty) => string;
  genRandomWords: (numWords: number, difficulty: Difficulty) => string[];
};

function createEmptyDifficultyWordsRecord() {
  return Object.values(Difficulty).reduce((acc, cur) => {
    acc[cur] = [];
    return acc;
  }, {} as Record<Difficulty, string[]>);
}

const defaultWordsContext: WordsContextType = {
  wordsContents: createEmptyDifficultyWordsRecord(),
  genRandomWord: () => '',
  genRandomWords: () => [],
};

export const WordsContext = createContext<WordsContextType>(defaultWordsContext);

export default function WordsProvider( { children }: { children: React.ReactNode } ) {
  const [wordsContents, setWordsContents] =
  useState<Record<Difficulty, string[]>>(createEmptyDifficultyWordsRecord());

  useEffect(() => {
    const loadFiles = async () => {
      const files = [
        { path: easyWords, difficulty: Difficulty.Easy },
        { path: mediumWords, difficulty: Difficulty.Medium },
        { path: hardWords, difficulty: Difficulty.Hard },
        { path: veryHardWords, difficulty: Difficulty.VeryHard },
      ];
      const promises = files.map(file => fetch(file.path).then(response => response.text()));
      const contents = await Promise.all(promises);
      contents.forEach((content, index) => {
        wordsContents[files[index].difficulty]
        = content.split('\n').map(word => word.trim()).filter(word => word.length > 0);
      });
      setWordsContents(wordsContents);
    };

    loadFiles();
  }, [wordsContents]);

  const genRandomWord = (difficulty: Difficulty) => {
    const words = wordsContents[difficulty];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  const genRandomWords = (numWords: number, difficulty: Difficulty) => {
    const n = Math.min(numWords, wordsContents[difficulty].length);
    const randomWords: string[] = [];
    const wordSet = new Set<string>();

    while(randomWords.length < n) {
      const word = genRandomWord(difficulty);
      if (wordSet.has(word)) {
        continue;
      }
      randomWords.push(word);
      wordSet.add(word);
    }

    return randomWords;
  }

  return (
    <WordsContext.Provider value={
      {wordsContents: wordsContents, genRandomWord, genRandomWords}}>
      {children}
    </WordsContext.Provider>
  );
}