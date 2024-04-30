import { createContext, useEffect, useState } from 'react';
import easyWords from '/src/assets/words/easy.txt'
import mediumWords from '/src/assets/words/medium.txt';
import hardWords from '/src/assets/words/hard.txt';
import veryHardWords from '/src/assets/words/very-hard.txt';
import { Difficulty } from './Difficulty';

type WordsContextType = {
  [key in Difficulty]: string[];
};

function createEmptyWordsContext() {
  return Object.values(Difficulty).reduce((acc, cur) => {
    acc[cur] = [];
    return acc;
  }, {} as Record<Difficulty, string[]>);
}

export const WordsContext = createContext<WordsContextType>(createEmptyWordsContext());

export default function WordsProvider( { children }: { children: React.ReactNode } ) {
  const [wordsContents, setWordsContents] =
  useState<WordsContextType>(createEmptyWordsContext());

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
      const wordsContents: WordsContextType = createEmptyWordsContext();
      contents.forEach((content, index) => {
        wordsContents[files[index].difficulty] = content.split('\n');
      });
      setWordsContents(wordsContents);
    };

    loadFiles();
  }, []);

  return (
    <WordsContext.Provider value={wordsContents}>
      {children}
    </WordsContext.Provider>
  );
}