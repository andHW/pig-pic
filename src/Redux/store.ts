import { configureStore } from '@reduxjs/toolkit';
import drawerGameStatesReducer from './DrawerGameStates';

const store = configureStore({
  reducer: {
    drawerGameStates: drawerGameStatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;