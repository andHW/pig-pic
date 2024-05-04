import { useCallback, useMemo, useState } from "react";

import { Box, Button, Chip, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from "@mui/material";
import TranslateIcon from '@mui/icons-material/Translate';
import CasinoIcon from '@mui/icons-material/Casino';

import { useWordsContext } from "../words/useWordsContext";
import { Difficulty } from "../words/Difficulty";
import SandBox from "./SandBox";

const MAX_WORDS = 20;
const MIN_WORDS = 1;
const SMALL_SCREEN_HEIGHT = '38vh';
const LARGE_SCREEN_HEIGHT = '50vh';
const WIDTH = '85%';

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
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const wordsContext = useWordsContext();
  const [words, setWords] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const [numWords, setNumWords] = useState<string>('1');
  const numWordsInt = parseInt(numWords);

  const generateWords = () => {
    const words = wordsContext.genRandomWords(
      Math.min(numWordsInt, MAX_WORDS), difficulty);
    setWords(words);
  }

  const handleKeyPress = (event: { key: string; }) => {
    if(event.key === 'Enter'){
      generateWords();
    }
  }

  return (
    <SandBox onKeyUp={handleKeyPress} icon={<TranslateIcon/>} title="Words" >
      <Box sx={{height: isSmallScreen ? SMALL_SCREEN_HEIGHT : LARGE_SCREEN_HEIGHT,
        width: WIDTH ,display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}
      >
        <Stack direction={'row'} spacing={ isSmallScreen ? 1 : 2 } rowGap={ isSmallScreen ? 1 : 2 }
          sx={{flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}
        >
          {words.map((word, index) => (
            <Chip label={word} key={index} color='secondary'
              sx={
                isSmallScreen
                  ? { height: '1.2rem', fontSize: '1rem' }
                  : { height: '3rem', fontSize: '2.5rem' }
              }
            />
          ))}
        </Stack>
      </Box>
      <Paper elevation={2} sx={{padding: 2, position: 'fixed', bottom: 12}}>
        <Stack spacing={1} direction={'column'}>
          <DifficultyToggle difficulty={difficulty} setDifficulty={setDifficulty} />
          <WordTextField isSmallScreen={isSmallScreen} numWords={numWords} setNumWords={setNumWords} numWordsInt={numWordsInt} />
          <Button onClick={generateWords} startIcon={<CasinoIcon/>}>
            Generate
          </Button>
        </Stack>
      </Paper>
    </SandBox>
  );
}

export default Words;