import { Button, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from 'react';

interface HomeBigButtonProps {
    route: string;
    icon: string;
    label: string;
}

const buttonFontSize = 25;
const buttonIconFontSize = 30;

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  width: '100%',
});

const StyledButton = styled(Button)({
  fontSize: buttonFontSize,
  whiteSpace: 'nowrap',
});

const HomeBigButton: React.FC<HomeBigButtonProps> = ({ route, icon, label }) => {
  return (
    <StyledLink to={route}>
      <StyledButton
        fullWidth
        startIcon={
          <Typography style={{ fontSize: buttonIconFontSize }}>
            {icon}
          </Typography>}
      >
        {label}
      </StyledButton>
    </StyledLink>
  );
};

export default HomeBigButton;