import { Avatar, Box, Button, Stack, styled, TextField, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from "react";

const StyledBox = styled(Box)({
  display: "flex",
  justifySelf: "center",
  alignSelf: "center",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "100%",
  flexDirection: "column",
});

const MIN_TIME_LIMIT = 1;
const MAX_TIME_LIMIT = 300;

function validateTimeLimit(value: number) {
  if (value < MIN_TIME_LIMIT || value > MAX_TIME_LIMIT) {
    return `Field must be between ${MIN_TIME_LIMIT} and ${MAX_TIME_LIMIT}.`;
  }
  return '';
}

function Drawer() {
  const [timeLimitError, setTimeLimitError] = useState('');

  return (
    <StyledBox>
      <Stack spacing={2} alignItems="center" width={250}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <SettingsIcon/>
        </Avatar>
        <Typography variant="h4">Settings</Typography>
        <TextField
          fullWidth label="🎰 Seed" variant="outlined"
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
          onChange={(event) => {
            const value = Number(event.target.value);
            const error = validateTimeLimit(value);
            setTimeLimitError(error);
          }}
        />
        <Button variant="contained" color="primary" fullWidth>
          Game on!
        </Button>
      </Stack>
    </StyledBox>
  );
}

export default Drawer;