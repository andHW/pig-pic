import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as routes from './routes.ts';

import Home from './pages/Home.tsx';
import GameManager from './pages/GameManager.tsx';
import Drawer from "./pages/Drawer.tsx";
import Words from './pages/Words.tsx';
import NotFound from './pages/NotFound.tsx';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { themeOptions } from './ThemeOptions.tsx';
import WordsProvider from './WordsProvider.tsx';

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
        element: <GameManager />,
      },
      {
        path: routes.words,
        element: <Words />,
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ],
  }
]);

let theme = createTheme(themeOptions);
theme = responsiveFontSizes(theme);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <WordsProvider>
        <RouterProvider router={router} />
      </WordsProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
