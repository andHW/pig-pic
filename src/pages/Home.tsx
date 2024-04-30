import { Box, Stack, styled } from "@mui/material";
import * as routes from '../routes';
import HomeBigButton from '../components/HomeBigButton';

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
      <Stack spacing={2} direction="column" alignContent="center" alignItems="center">
        {Object.entries(buttonProps).map(([route, { icon, label }]) => (
          <HomeBigButton key={route} route={route} icon={icon} label={label} />
        ))}
      </Stack>
    </StyledBox>
  );
}

export default Home;