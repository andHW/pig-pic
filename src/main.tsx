import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Drawer from "./pages/Drawer.tsx";
import Home from './pages/Home.tsx';
import Game from './pages/Guesser.tsx';
import * as routes from './routes.ts';
import { createTheme, ThemeProvider } from '@mui/material';

const router = createBrowserRouter([
  {
    path: routes.base,
    element: <App />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.drawer,
        element: <Drawer />,
      },
      {
        path: routes.game,
        element: <Game />,
      },
    ],
  }
]);

const theme = createTheme({
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
