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

const buttonProps = {
  [routes.game]: { icon: "👾", label: "Game Mode" },
  [routes.drawer]: { icon: "🎨", label: "Drawer Mode" },
};

function Home() {
  return (
    <StyledBox>
      <Stack spacing={2} direction="row">
        {Object.entries(buttonProps).map(([route, { icon, label }]) => (
          <HomeBigButton key={route} route={route} icon={icon} label={label} />
        ))}
      </Stack>
    </StyledBox>
  );
}

export default Home;