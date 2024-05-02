import React, { useState } from 'react';
import { Stack, Avatar, Typography, TextField, Button, Paper } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import BrushIcon from '@mui/icons-material/Brush';

import { useDispatch, useSelector } from 'react-redux';
import { DrawerGameStage } from '../../Redux/DrawerGameStates';
import { setGameStage, setSeed as setRSeed, setTimeLimit as setRTimeLimit } from '../../Redux/DrawerGameStates';
import { RootState } from '../../Redux/store';
import SandBox from '../SandBox';

interface ConfigsProps {
  minTimeLimit: number;
  maxTimeLimit: number;
}

const DrawerConfig: React.FC<ConfigsProps> = ({minTimeLimit: MIN_TIME_LIMIT, maxTimeLimit: MAX_TIME_LIMIT }) => {
  const drawerGameState = useSelector((state: RootState) => state.drawerGameStates);

  //TODO: use react-hook-form
  const [seed, setSeed] = useState(drawerGameState.seed);
  const [timeLimit, setTimeLimit] = useState(drawerGameState.timeLimit);
  const [timeLimitError, setTimeLimitError] = useState('');
  const dispatch = useDispatch();

  const validateTimeLimit = (value: number) => {
    if (value < MIN_TIME_LIMIT || value > MAX_TIME_LIMIT) {
      return `Field must be between ${MIN_TIME_LIMIT} and ${MAX_TIME_LIMIT}.`;
    }
    return '';
  };

  function handleGameStart(): void {
    dispatch(setGameStage(DrawerGameStage.SELECT_WORD));
    dispatch(setRSeed(seed));
    dispatch(setRTimeLimit(timeLimit));
  }

  return (
    <SandBox title='Drawer' icon={<BrushIcon/>}>
      <Paper elevation={3} sx={{marginTop: 4, padding: 2 }}>
        <Stack spacing={2} alignItems="center" width={250}>
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <SettingsIcon/>
          </Avatar>
          <Typography variant="h4">Settings</Typography>
          <TextField
            fullWidth label="🎰 Seed" variant="outlined" required={true}
            value={seed}
            onChange={(event) => setSeed(event.target.value)}
          />
          <TextField
            fullWidth
            label="⏳ Time Limit (seconds)"
            variant="outlined"
            required
            type="number"
            inputProps={{ min: MIN_TIME_LIMIT.toString(), max: MAX_TIME_LIMIT.toString() }}
            error={Boolean(timeLimitError)}
            helperText={timeLimitError}
            value={timeLimit}
            onChange={(event) => {
              const value = Number(event.target.value);
              const error = validateTimeLimit(value);
              setTimeLimitError(error);
              if (!error) {
                setTimeLimit(value);
              }
            }}
          />
          <Button
            variant="contained" color="primary" fullWidth
            onClick={handleGameStart}
          >
        Game on!
          </Button>
        </Stack>
      </Paper>
    </SandBox>
  );
};

export default DrawerConfig;