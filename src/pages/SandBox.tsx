import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import ScienceIcon from '@mui/icons-material/Science';
import { PropsWithChildren, ComponentPropsWithoutRef } from 'react';
import { TapeImg } from "../components/TapeImg";

const defaultTitle = "SandBox";
const defaultIcon = <ScienceIcon/>;

type SandBoxProps = PropsWithChildren<{
  title?: string;
  icon?: React.ReactNode;
}> & ComponentPropsWithoutRef<'div'>;

function SandBox({ title = defaultTitle, icon = defaultIcon, children, ...props }: SandBoxProps) {
  return(
    //TODO: fix the tapes, make the position more responsive to different box size
    <Box sx={{ zIndex: 7853, display: 'flex', flexDirection: 'column', justifyItems:'center', alignItems:'center', width: '100%'}} {...props}>
      <Paper elevation={6} sx={{margin: 1, padding: 2, paddingLeft: 12, paddingRight: 12 }}>
        <Box style={{position:'relative', top: '-48px', left: '-96px'}}>
          <TapeImg/>
        </Box>
        <Box style={{position:'relative', top: '-48px', right: '-96px'}}>
          <TapeImg/>
        </Box>
        <Box style={{position:'relative', top: '-16px', right: '-128px', transform: 'rotate(60deg)'}}>
          <TapeImg/>
        </Box>
        <Stack spacing={2} alignItems="center">
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {icon}
          </Avatar>
          <Typography variant="h4">{title}</Typography>
        </Stack>
      </Paper>
      {children}
    </Box>
  )
}

export default SandBox;