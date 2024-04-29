import { Box, TextField } from "@mui/material";

function Drawer() {
  return (
    <Box
      display="flex"
      justifySelf="center"
      alignSelf="center"
      justifyContent="space-evenly"
      alignItems="center"
      width="100%"
      flexDirection="column"
    >
      <TextField label="Seed" variant="outlined" required />
      <TextField label="Time Limit" variant="outlined" required />
    </Box>
  );
}

export default Drawer;