import { Avatar, Box, Button, Chip, Stack, styled, TextField, Typography } from "@mui/material";
import {Face, Settings, SportsMartialArts} from '@mui/icons-material';
import { useEffect, useState } from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(2),
  justifySelf: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(8),
}));

function GameManager() {
  const [names, setNames] = useState<string[]>([]);
  const [nameSet, setNameSet] = useState<Set<string>>(new Set());

  useEffect(() => {
    setNames(Array.from(nameSet));
  }, [nameSet]);

  // TOOD: show error messages like duplicated names
  const handleNameInputChange = (input: string) => {
    const newNames = input
      .split(';')
      .map(name => name.trim())
      .filter(name => name !== '');
    setNameSet(new Set(newNames));
  };

  return (
    <StyledBox>
      <Stack spacing={2} alignItems="center" width="100%" maxWidth={500}>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <Settings/>
        </Avatar>
        <Typography variant="h4">Settings</Typography>
        <TextField
          fullWidth label="🎰 Seed" variant="outlined" required
        />
        <TextField
          onChange={(e) => handleNameInputChange(e.target.value)}
          label="Names"
          placeholder="separated by semicolon. e.g. Alice; Bob; Charlie; ..."
          variant="outlined"
          fullWidth
          required
        />
        <Button variant="contained" color="primary" fullWidth>
          Game on!
        </Button>
      </Stack>

      <Stack spacing={2} alignItems="center" width='80vw'>
        <Avatar sx={{ bgcolor: 'info.main' }}>
          <SportsMartialArts/>
        </Avatar>
        <Typography variant="h4">Players</Typography>

        {names.length < 1 ?
          <Typography>
      Waiting for your input...
          </Typography>
          :
          <Stack spacing={1} direction="row" sx={{ flexWrap: 'wrap', rowGap: 1 }}>
            {names.map((name, index) => (
              <Chip key={index} icon={<Face />} label={name} color="info" />
            ))}
          </Stack>
        }
      </Stack>
    </StyledBox>
  );
}

export default GameManager;