import { Box, styled } from "@mui/material";
import DrawerConfig from "./DrawerConfig";
import { DrawerGameStage } from "../../Redux/DrawerGameStates";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import SelectWord from "./SelectWord";

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

function getDrawerStage(stage : DrawerGameStage) {
  switch (stage) {
  case DrawerGameStage.CONFIG:
    return <DrawerConfig minTimeLimit={MIN_TIME_LIMIT} maxTimeLimit={MAX_TIME_LIMIT} />;
  case DrawerGameStage.SELECT_WORD:
    return <SelectWord/>;
  }
}

function Drawer() {
  const drawerGameState = useSelector((state: RootState) => state.drawerGameStates);
  return (
    <StyledBox>
      {getDrawerStage(drawerGameState.gameStage)}
    </StyledBox>
  );
}

export default Drawer;