import { useCallback, useMemo, useState } from "react";

import styled from "@emotion/styled";
import { Avatar, Box, Button, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from "@mui/material";
import TranslateIcon from '@mui/icons-material/Translate';

import { useWordsContext } from "../useWordsContext";
import { Difficulty } from "../Difficulty";

const MAX_WORDS = 20;
const MIN_WORDS = 1;
const SMALL_SCREEN_HEIGHT = '32vh';
const LARGE_SCREEN_HEIGHT = '64vh';
const WIDTH = '85%';
const SMALL_SCREEN_VARIANT = 'h5';
const LARGE_SCREEN_VARIANT = 'h2';
const SMALL_SCREEN_DIRECTION = 'column';
const LARGE_SCREEN_DIRECTION = 'row';

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
        size="medium"
        fullWidth={isSmallScreen}
        type="number"
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
          <ToggleButton key={value} value={value} onClick={() => setDifficulty(value)}>
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
  const [numWords, setNumWords] = useState<string>('');
  const numWordsInt = parseInt(numWords);

  const generateWord = useCallback(() => {
    const words = wordsContext[difficulty];
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    return word;
  }, [difficulty, wordsContext]);

  const generateWords = useCallback(() => {
    const words = [];
    for (let i = 0; i < numWordsInt; i++) {
      const word = generateWord();
      words.push(word);
    }
    setWords(words.join(', '));
  }, [numWordsInt, generateWord, setWords]);

  return (
    <StyledBox>
      <Stack spacing={2} alignItems="center" width={250}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <TranslateIcon/>
        </Avatar>
        <Typography variant="h4">Words</Typography>
      </Stack>
      <Box sx={{height: isSmallScreen ? SMALL_SCREEN_HEIGHT : LARGE_SCREEN_HEIGHT, width: WIDTH ,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <WordsTypography isSmallScreen={isSmallScreen} words={words} />
      </Box>
      <Stack spacing={2} direction={isSmallScreen ? SMALL_SCREEN_DIRECTION : LARGE_SCREEN_DIRECTION} alignItems={'center'}>
        <DifficultyToggle difficulty={difficulty} setDifficulty={setDifficulty} />
        <WordTextField isSmallScreen={isSmallScreen} numWords={numWords} setNumWords={setNumWords} numWordsInt={numWordsInt} />
        <Button onClick={generateWords} fullWidth={isSmallScreen}>
          Generate
        </Button>
      </Stack>
    </StyledBox>
  );
}

export default Words;