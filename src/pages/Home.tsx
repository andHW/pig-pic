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
                <Link
                    to={routes.game}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                >
                    <Button
                        variant="contained"
                        startIcon={<Typography variant="h6">👾</Typography>}
                    >
                        Game
                    </Button>
                </Link>
                <Link to={routes.drawer} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button
                        variant="contained"
                        startIcon={<Typography variant="h6">🎨</Typography>}
                    >

                        Drawer
                    </Button>
                </Link>
            </Stack>
        </Box >
    );
}

export default Home;