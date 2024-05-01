import { Box, Paper, Stack, styled } from "@mui/material";
import * as routes from '../routes';
import HomeBigButton from '../components/HomeBigButton';
import { TapeImg } from "../components/TapeImg";

const StyledBox = styled(Box)({
  display: "flex",
  justifySelf: "center",
  alignSelf: "center",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "100%",
  flexDirection: "column",
  height: 150,
});

type SpecificRoutes = typeof routes.game | typeof routes.drawer | typeof routes.words;

const routeLabels: Record<SpecificRoutes, string> = {
  [routes.game]: "Game Mode",
  [routes.drawer]: "Drawer Mode",
  [routes.words]: "Words Mode",
};

const buttonProps = Object.entries(routeLabels).reduce((props, [route, label]) => {
  props[route as SpecificRoutes] =
    { icon: routes.routesEmojiMap[route as SpecificRoutes], label };
  return props;
}, {} as Record<SpecificRoutes, { icon: string; label: string }>);

function Home() {
  return (
    <StyledBox>
      <Box style={{position:'relative', top: '-24px', left:'-48px', transform: 'rotate(12deg)'}}>
        <TapeImg/>
      </Box>
      <Box style={{position:'relative', top: '-36px', left:'-12px'}}>
        <TapeImg/>
      </Box>
      <Paper elevation={2} sx={{padding: 2, paddingTop: 3}}>
        <Stack spacing={2} direction="column" alignContent="center" alignItems="center">
          {Object.entries(buttonProps).map(([route, { icon, label }]) => (
            <HomeBigButton key={route} route={route} icon={icon} label={label} />
          ))}
        </Stack>
      </Paper>
    </StyledBox>
  );
}

export default Home;