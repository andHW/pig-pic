import { useContext } from 'react';
import { WordsContext } from './WordsProvider';

export function useWordsContext() {
  return useContext(WordsContext);
}