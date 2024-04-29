import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'



import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as routes from './routes.ts';

import Drawer from "./pages/Drawer.tsx";
import Home from './pages/Home.tsx';
import Game from './pages/Guesser.tsx';
import NotFound from './pages/NotFound.tsx';

import { createTheme, ThemeProvider } from '@mui/material';
import { themeOptions } from './ThemeOptions.tsx';

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
      {
        path: '*',
        element: <NotFound />,
      }
    ],
  }
]);

const theme = createTheme(themeOptions);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
