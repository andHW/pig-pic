import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum DrawerGameStage {
    CONFIG = 'Config',
    SELECT_WORD = 'Select Word',
}

interface DrawerGameState {
  seed: string;
  timeLimit: number;
  gameStage: DrawerGameStage;
}

const initialState: DrawerGameState = {
  seed: 'oink oink',
  timeLimit: 45,
  gameStage: DrawerGameStage.CONFIG,
};

// Create a slice of the Redux store
const drawerGameStatesSlice = createSlice({
  name: 'drawerGameStates',
  initialState,
  reducers: {
    setSeed: (state, action: PayloadAction<string>) => {
      state.seed = action.payload;
    },
    setTimeLimit: (state, action: PayloadAction<number>) => {
      state.timeLimit = action.payload;
    },
    setGameStage: (state, action: PayloadAction<DrawerGameStage>) => {
      state.gameStage = action.payload;
    },
  },
});

// Export the action creators
export const { setSeed, setTimeLimit, setGameStage } = drawerGameStatesSlice.actions;

export default drawerGameStatesSlice.reducer;