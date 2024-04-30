import { Link, Outlet, useLocation } from "react-router-dom";
import * as routes from './routes.ts';
import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';

export default function App() {
  const theme = useTheme();
  const location = useLocation();

  const getPageName = () => {
    return routes.routesEmojiMap[location.pathname as keyof typeof routes.routesEmojiMap] || '🐛';
  };

  return (
    <Box
      display="flex" flexDirection="column" minHeight="100vh"
      sx={{ background: theme.palette.background.default }}
    >
      <AppBar
        position="fixed"
        sx={{ background: 'linear-gradient(45deg, #FE6B8B 20%, #FF8E53 30%, #FFED78 90%)', }}
      >
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
