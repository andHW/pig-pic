import { useCallback, useMemo, useState } from "react";

import styled from "@emotion/styled";
import { Avatar, Box, Button, Stack, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from "@mui/material";
import TranslateIcon from '@mui/icons-material/Translate';

import { useWordsContext } from "../useWordsContext";
import { Difficulty } from "../Difficulty";

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
  const [word, setWord] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);

  const generateWord = useCallback(() => {
    const words = wordsContext[difficulty];
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    setWord(word);
  }, [difficulty, wordsContext]);

  return (
    <StyledBox>
      <Stack spacing={2} alignItems="center" width={250}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <TranslateIcon/>
        </Avatar>
        <Typography variant="h4">Words</Typography>
      </Stack>
      <Box sx={{height: '55vh', width: '100%' ,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 500 }}>
          { word ? word : '...'}
        </Typography>
      </Box>
      <Stack spacing={2} direction={isSmallScreen ? "column" : "row"}>
        <DifficultyToggle difficulty={difficulty} setDifficulty={setDifficulty} />
        <Button onClick={generateWord} fullWidth={isSmallScreen}>
        Generate
        </Button>
      </Stack>
    </StyledBox>
  );
}

export default Words;