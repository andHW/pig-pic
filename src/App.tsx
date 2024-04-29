import { Link, Outlet, useLocation } from "react-router-dom";
import * as routes from './routes.ts';
import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';

export default function App() {
  const theme = useTheme();
  const location = useLocation();

  const getPageName = () => {
    switch (location.pathname) {
      case routes.home:
        return '🏠';
      case routes.drawer:
        return '🎨';
      case routes.game:
        return '👾';
      default:
        return '🐛';
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="fixed">
        <Toolbar>
          <Box width="100%">
            <Typography
              variant="h4" component="div" noWrap
              sx={{ 'color': theme.palette.common.white }}
            >
              <Link to={routes.home} style={{ textDecoration: 'none', color: 'inherit' }}>
                🐷 Pictionary
              </Link>
              &nbsp; | {getPageName()}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Box display="flex" flexGrow={1}>
        <Outlet />
      </Box>
    </Box>
  );
}
