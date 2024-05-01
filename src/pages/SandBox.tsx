import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import ScienceIcon from '@mui/icons-material/Science';
import { PropsWithChildren, ComponentPropsWithoutRef } from 'react';

const defaultTitle = "SandBox";
const defaultIcon = <ScienceIcon/>;

const tape = '/src/assets/tape.png';

type SandBoxProps = PropsWithChildren<{
  title?: string;
  icon?: React.ReactNode;
}> & ComponentPropsWithoutRef<'div'>;

const tapeImg =
<img src={tape} height='64px'
  style={{position:'absolute', zIndex: 7853, opacity:0.5, transform: 'rotate(24deg)', pointerEvents: 'none'}}
/>;

function SandBox({ title = defaultTitle, icon = defaultIcon, children, ...props }: SandBoxProps) {
  return(
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyItems:'center', alignItems:'center', width: '100%'}} {...props}>
      <Paper elevation={6} sx={{margin: 1, padding: 2, paddingLeft: 12, paddingRight: 12 }}>
        <Box style={{position:'relative', top: '-48px', left: '-96px'}}>
          {tapeImg}
        </Box>
        <Box style={{position:'relative', top: '-48px', right: '-96px'}}>
          {tapeImg}
        </Box>
        <Box style={{zIndex: 7853, position:'relative', top: '-16px', right: '-128px', transform: 'rotate(60deg)'}}>
          {tapeImg}
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