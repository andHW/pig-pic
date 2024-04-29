import styled from "@emotion/styled";
import { Avatar, Box, Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import TranslateIcon from '@mui/icons-material/Translate';
import { useWordsContext } from "../useWordsContext";
import { useState } from "react";
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

function Words() {
  const wordsContext = useWordsContext();
  const [word, setWord] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);

  const generateWord = () => {
    const words = wordsContext[difficulty]; // replace Difficulty.Easy with the desired difficulty level
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    setWord(word);
  };

  return (
    <StyledBox>
      <Stack spacing={2} alignItems="center" width={250}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <TranslateIcon/>
        </Avatar>
        <Typography variant="h4">Words</Typography>
      </Stack>
      <Box sx={{height: '50vh', width: '100%' ,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="h2">
          { word ? word : '...'}
        </Typography>
      </Box>
      <Stack spacing={2} direction="row">
        <ToggleButtonGroup value={difficulty} color="primary">
          {
            Object.values(Difficulty).map((value) => (
              <ToggleButton key={value} value={value} onClick={() => setDifficulty(value)}>
                {value}
              </ToggleButton>
            ))
          }
        </ToggleButtonGroup>
        <Button onClick={generateWord}>
        Generate
        </Button>
      </Stack>
    </StyledBox>
  );
}

export default Words;