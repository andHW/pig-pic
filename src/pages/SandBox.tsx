import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import ScienceIcon from '@mui/icons-material/Science';
import { PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import { TapeImg } from "../components/TapeImg";

const defaultTitle = "SandBox";
const defaultIcon = <ScienceIcon/>;

type SandBoxProps = PropsWithChildren<{
  title?: string;
  icon?: React.ReactNode;
  inPaperChildren?: React.ReactNode | undefined;
}> & ComponentPropsWithoutRef<'div'>;

function SandBox({ title = defaultTitle, icon = defaultIcon, inPaperChildren, children, ...props }: SandBoxProps) {
  return(
    //TODO: fix the tapes, make the position more responsive to different box size
    <Box sx={{ zIndex: 7853, display: 'flex', flexDirection: 'column', justifyItems:'center', alignItems:'center', width: '100%'}} {...props}>
      <Paper elevation={6}
        sx={{margin: 1, padding: 2, paddingLeft: 12, paddingRight: 12,
          display:'flex', justifyContent: 'center', alignItems: 'center'}}
      >
        <Box style={{position: 'absolute', display: 'flex', top: 32 }}>
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
      {children}
    </Box>
  )
}

export default SandBox;