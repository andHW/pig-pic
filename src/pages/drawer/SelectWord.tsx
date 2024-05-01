//TODO: BIG REFACTORING

import { RootState } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerGameStage, setGameStage } from '../../Redux/DrawerGameStates';

import { Avatar, Box, Button, Card, CardContent, CardHeader, Chip, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CasinoIcon from '@mui/icons-material/Casino';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

import sound from '/src/assets/timesup.mp3';

import { useEffect, useMemo, useState } from 'react';

import seedrandom from 'seedrandom';
import { Difficulty } from '../../words/Difficulty';
import { useWordsContext } from '../../words/useWordsContext';

const SMALL_SCREEN_HEIGHT = '24vh';
const LARGE_SCREEN_HEIGHT = '32vh';

function SelectWord() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const drawerGameState = useSelector((state: RootState) => state.drawerGameStates);
  const dispatch = useDispatch();

  const wordsContext = useWordsContext();
  const rng = useMemo(() => seedrandom(drawerGameState.seed), [drawerGameState.seed]);

  const generateWords = () => {
    const difficulties: Difficulty[] = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard, Difficulty.VeryHard];
    const words: { [key in Difficulty]: string } = {
      [Difficulty.Easy]: '',
      [Difficulty.Medium]: '',
      [Difficulty.Hard]: '',
      [Difficulty.VeryHard]: ''
    };

    difficulties.forEach(difficulty => {
      const wordList = wordsContext.wordsContents[difficulty];
      const randomIndex = Math.floor(rng() * wordList.length);
      words[difficulty] = wordList[randomIndex];
    });

    return words;
  };

  const [words, setWords] = useState({});
  const [ready, setReady] = useState(false);
  const [countdown, setCountdown] = useState(drawerGameState.timeLimit);

  useEffect(() => {
    if (countdown === 0) {
      const audio = new Audio(sound);
      audio.play();
    }
  }, [countdown]);

  useEffect(() => {
    let timer: number;
    if (ready) {
      timer = window.setInterval(() => {
        setCountdown(prevCountdown => prevCountdown > 0 ? prevCountdown - 1 : 0);
      }, 1000);
    }

    return () => {
      if (timer) {
        window.clearInterval(timer);
      }
    };
  }, [ready]);

  return (
    <Stack spacing={2} alignItems="center">
      <Stack spacing={2} alignItems="center" width={250}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <MenuBookIcon/>
        </Avatar>
        <Typography variant="h4">Word Selection</Typography>
      </Stack>

      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Chip icon={<CasinoIcon/>} color="info"
          label={drawerGameState.seed} />
        <Chip icon={<HourglassEmptyIcon/>} color="info"
          label={`${drawerGameState.timeLimit}s`}/>
      </Stack>

      {ready &&
            <Stack spacing={1} direction='row'>
              {
                Object.entries(words).map(([difficulty, word]) => (
                  <Card key={difficulty}>
                    <CardHeader
                      title={difficulty}
                      sx={{ backgroundColor: theme.palette.primary.main, textAlign: 'center'}}
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}
                      titleTypographyProps={{variant:'body1' }}
                    />
                    <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '8px' }}>
                      <Typography variant='body2' align='center'>
                        {word as string}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              }
            </Stack>
      }

      <Box sx={{height: isSmallScreen ? SMALL_SCREEN_HEIGHT : LARGE_SCREEN_HEIGHT}} justifyContent={'center'} alignItems={'center'} alignContent={'center'}>
        {!ready &&
          <Button endIcon={<HourglassEmptyIcon/>} onClick={()=> { setReady(true); setWords(generateWords());}}>
            {"I'm ready!"}
          </Button>
        }
        {ready &&
          <Typography variant="h1" align='center' style={{letterSpacing: 0}}>{countdown}</Typography>
        }
      </Box>

      <Button onClick={()=> { setReady(false); setCountdown(drawerGameState.timeLimit); }} disabled={!ready}>
        {"Next one!"}
      </Button>

      <Button
        onClick={() => {dispatch(setGameStage(DrawerGameStage.CONFIG))}}
      >
        End Game
      </Button>
    </Stack>
  );
}

export default SelectWord;