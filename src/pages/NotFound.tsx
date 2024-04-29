import * as routes from '../routes.ts';
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function NotFound() {
  return (
    <Box
      display="flex"
      justifySelf="center"
      alignSelf="center"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
      width="100%"
      flexDirection="column"
    >
      <Typography variant="h2">
                404 Not Found!
      </Typography>
      <Typography variant="h1" component="div" noWrap>
        <Link to={routes.home} style={{ textDecoration: 'none', color: 'inherit' }}>
                    🏠
        </Link>
      </Typography>
    </Box>
  );
}

export default NotFound;