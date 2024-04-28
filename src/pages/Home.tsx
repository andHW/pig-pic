import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as routes from '../routes';

function Home() {
    return (
        <Box
            display="flex"
            justifySelf="center"
            alignSelf="center"
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
            flexDirection="column"
            height={150}
        >
            <Typography variant="h4">
                Mode
            </Typography>

            <Stack spacing={2} direction="row">
                <Button variant="contained">
                    <Link to={routes.game} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Game
                    </Link>
                </Button>
                <Button variant="contained">
                    <Link to={routes.drawer} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Drawer
                    </Link>
                </Button>
            </Stack>
        </Box >
    );
}

export default Home;