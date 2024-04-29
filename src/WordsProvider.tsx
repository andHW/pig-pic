import { createContext, useEffect, useState } from 'react';
import easyWords from './assets/words/easy.txt';
import mediumWords from './assets/words/medium.txt';
import hardWords from './assets/words/hard.txt';
import veryHardWords from './assets/words/very-hard.txt';
import { Difficulty } from './Difficulty';

type WordsContextType = {
  [key in Difficulty]: string[];
};

export const WordsContext = createContext<WordsContextType>({
  [Difficulty.Easy]: [],
  [Difficulty.Medium]: [],
  [Difficulty.Hard]: [],
  [Difficulty.VeryHard]: []
});

export default function WordsProvider( { children }: { children: React.ReactNode } ) {
  const [wordsContents, setWordsContents] = useState<WordsContextType>(
    {
      [Difficulty.Easy]: [],
      [Difficulty.Medium]: [],
      [Difficulty.Hard]: [],
      [Difficulty.VeryHard]: []
    }
  );

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
      const wordsContents: WordsContextType = {
        [Difficulty.Easy]: [],
        [Difficulty.Medium]: [],
        [Difficulty.Hard]: [],
        [Difficulty.VeryHard]: []
      };
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