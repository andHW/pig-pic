import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import ScienceIcon from '@mui/icons-material/Science';
import { PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import { TapeImg } from "../components/TapeImg";

const defaultTitle = "SandBox";
const defaultIcon = <ScienceIcon/>;
const defaultChildren =
  <Paper sx={{padding: 8}}>
    <Typography variant="h6">Dust and ashes</Typography>
  </Paper>;

type SandBoxProps = PropsWithChildren<{
  title?: string;
  icon?: React.ReactNode;
  inPaperChildren?: React.ReactNode | undefined;
}> & ComponentPropsWithoutRef<'div'>;

function SandBox({ title = defaultTitle, icon = defaultIcon, inPaperChildren, children = defaultChildren, ...props }: SandBoxProps) {
  return(
    <Box sx={{ zIndex: 7853, display: 'flex', flexDirection: 'column', justifyItems:'center', alignItems:'center', width: '100%'}} {...props}>
      <Paper elevation={6}
        sx={{
          position: 'absolute',
          margin: 1, padding: 2, paddingLeft: 8, paddingRight: 8,
          display:'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <Box style={{position: 'absolute', display: 'flex', top: -32 }}>
          <TapeImg/>
          <TapeImg style={{ position: 'relative', right: '-70px', transform: 'rotate(90deg)' }}/>
          <TapeImg/>
        </Box>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {icon}
          </Avatar>
          <Typography variant="h4">{title}</Typography>
          {inPaperChildren}
        </Stack>
      </Paper>
      <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </Box>
    </Box>
  )
}

export default SandBox;