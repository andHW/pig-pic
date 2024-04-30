import { useCallback, useMemo, useState } from "react";

import styled from "@emotion/styled";
import { Avatar, Box, Button, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from "@mui/material";
import TranslateIcon from '@mui/icons-material/Translate';
import CasinoIcon from '@mui/icons-material/Casino';

import { useWordsContext } from "../words/useWordsContext";
import { Difficulty } from "../words/Difficulty";

const MAX_WORDS = 20;
const MIN_WORDS = 1;
const SMALL_SCREEN_HEIGHT = '32vh';
const LARGE_SCREEN_HEIGHT = '56vh';
const WIDTH = '85%';
const SMALL_SCREEN_VARIANT = 'h5';
const LARGE_SCREEN_VARIANT = 'h2';

const WordsTypography =
  ({ isSmallScreen, words }: { isSmallScreen: boolean, words: string }) => (
    <Typography
      variant={isSmallScreen ? SMALL_SCREEN_VARIANT : LARGE_SCREEN_VARIANT}
      sx={{ textAlign: 'center' }}
    >
      { words ? words : '...'}
    </Typography>
  );

const WordTextField =
  ({ isSmallScreen, numWords, setNumWords, numWordsInt }:
    { isSmallScreen: boolean,
      numWords: string,
      setNumWords: (value: string) => void,
      numWordsInt: number }) => {
    const isError = numWordsInt < MIN_WORDS || numWordsInt > MAX_WORDS;
    const handleChange = useCallback((e: { target: { value: string; }; }) =>
      setNumWords(e.target.value.replace(/\D/g, '')), [setNumWords]);

    return (
      <TextField
        label="#words"
        fullWidth={isSmallScreen}
        value={numWords}
        onChange={handleChange}
        inputProps={{ min: MIN_WORDS, max: MAX_WORDS }}
        error={isError}
        helperText={isError ? `${MIN_WORDS}-${MAX_WORDS}, please.` : ""}
      />
    );
  };

const StyledBox = styled(Box)({
  display: "flex",
  justifySelf: "center",
  alignSelf: "center",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "100%",
  flexDirection: "column",
});

type DifficultyToggleProps = {
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
};

const DifficultyToggle: React.FC<DifficultyToggleProps> = ({ difficulty, setDifficulty }) => {
  const difficultyValues = useMemo(() => Object.values(Difficulty), []);

  return (
    <ToggleButtonGroup value={difficulty} color="primary">
      {
        difficultyValues.map((value) => (
          <ToggleButton
            key={value} value={value} onClick={() => setDifficulty(value)}
          >
            {value}
          </ToggleButton>
        ))
      }
    </ToggleButtonGroup>
  );
};

function Words() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const wordsContext = useWordsContext();
  const [words, setWords] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [numWords, setNumWords] = useState<string>('1');
  const numWordsInt = parseInt(numWords);

  const generateWord = useCallback(() => {
    const words = wordsContext[difficulty];
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    return word;
  }, [difficulty, wordsContext]);

  const generateWords = useCallback(() => {
    const numOfWords = Math.min( MAX_WORDS, numWordsInt);
    const words = [];
    for (let i = 0; i < numOfWords; i++) {
      const word = generateWord();
      words.push(word);
    }
    setWords(words.join(', '));
  }, [numWordsInt, generateWord, setWords]);

  const handleKeyPress = (event: { key: string; }) => {
    if(event.key === 'Enter'){
      generateWords();
    }
  }

  return (
    <StyledBox onKeyUp={handleKeyPress}>
      <Stack spacing={2} alignItems="center" width={250}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <TranslateIcon/>
        </Avatar>
        <Typography variant="h4">Words</Typography>
      </Stack>
      <Box sx={{height: isSmallScreen ? SMALL_SCREEN_HEIGHT : LARGE_SCREEN_HEIGHT, width: WIDTH ,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <WordsTypography isSmallScreen={isSmallScreen} words={words} />
      </Box>
      <Stack spacing={1} direction={'column'}>
        <DifficultyToggle difficulty={difficulty} setDifficulty={setDifficulty} />
        <WordTextField isSmallScreen={isSmallScreen} numWords={numWords} setNumWords={setNumWords} numWordsInt={numWordsInt} />
        <Button onClick={generateWords} startIcon={<CasinoIcon/>}>
            Generate
        </Button>
      </Stack>
    </StyledBox>
  );
}

export default Words;