
import React, { useState } from 'react';
import { Box, Button, FormControl, InputAdornment, IconButton, InputLabel, OutlinedInput, Stack, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import img from '../imgs/baground.png';
import logo from '../imgs/Kelsons Logo.jpg';
import { useNavigate } from 'react-router-dom';


const LoginComponent = () => {

  
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const navigate = useNavigate();

    const handleLoginClick = () => {
      navigate('/home');
    };

    

  return (
    <Box
      className="logo-container"
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: '100%', height: '100%' }}>
        <img src={img} alt="background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box
          sx={{
            position: 'absolute',
            top: '70px', 
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1, 
          }}
        >
          <img src={logo} alt="Logo" style={{ maxWidth: '260px', }} /> 
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: '1px solid grey',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 0, 
          }}
        >
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '45ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Email" variant="outlined" />
          </Box>

          <Box sx={{ mt: 3 }}>
            <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
          <Box sx={{ mt: 5, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <Stack spacing={2} direction="row">
              <Button sx={{backgroundColor:"#137e91"}} onClick={handleLoginClick} variant="contained">Log In</Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginComponent;

















