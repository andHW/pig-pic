import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { Provider } from 'react-redux'
import store from './Redux/store.ts'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as routes from './routes.ts';

import Home from './pages/Home.tsx';
import GameManager from './pages/GameManager.tsx';
import Drawer from "./pages/drawer/Drawer.tsx";
import Words from './pages/Words.tsx';
import NotFound from './pages/NotFound.tsx';

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import { themeOptions } from './ThemeOptions.tsx';
import WordsProvider from './words/WordsProvider.tsx';

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
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </WordsProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
