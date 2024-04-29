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
        >
            <Typography variant="h2">
                404 Not Found!
            </Typography>
        </Box>
    );
}

export default NotFound;