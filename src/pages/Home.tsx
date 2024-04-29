import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as routes from '../routes';

interface HomeBigButtonProps {
    route: string;
    icon: string;
    label: string;
}

const HomeBigButton: React.FC<HomeBigButtonProps> = ({ route, icon, label }) => {
    const buttonFontSize = 25;
    const buttonIconFontSize = 30;

    return (
        <Link to={route} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button
                variant="contained"
                size="large"
                startIcon={<Typography style={{ fontSize: buttonIconFontSize }}>{icon}</Typography>}
                sx={{ fontSize: buttonFontSize, whiteSpace: 'nowrap' }}
            >
                {label}
            </Button>
        </Link>
    );
};

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
            <Stack spacing={2} direction="row">
                <HomeBigButton route={routes.game} icon="👾" label="Game Mode" />
                <HomeBigButton route={routes.drawer} icon="🎨" label="Drawer Mode" />
            </Stack>
        </Box >
    );
}

export default Home;