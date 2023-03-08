import React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export default function UserProfile() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const userName = userData.name;
  const userEmail = userData.email;


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Account Details
          </Typography>
          <Box component="form"  noValidate sx={{ mt: 1 }}>
          <h5>Name: {userName}</h5>
          <h5>Email Adress: {userEmail}</h5>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}