import  { useState } from 'react';
import {

  Toolbar,
  Box,
  Button,
  FormControl,
  InputAdornment,
  IconButton,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import img from '../imgs/baground.png';
import logo from '../imgs/Kelsons Logo.jpg';
import img1 from '../imgs/img1.png';
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
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Bar */}
      <Box position="static" sx={{  height: '65px',backgroundColor: 'white',justifyContent: 'center'  }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo Section */}
          <Box sx={{ marginLeft: '16px' }}>
            <img src={logo} alt="Logo" style={{ height: '60px' }} />
          </Box>

          {/* Text Section */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#137e91',
                fontSize: '1.5rem', // Increased font size
              }}
            >
              KOC - Kelsons Online Sand Controller
            </Typography>
          </Box>
        </Toolbar>
      </Box>




      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          background: `url(${img}) no-repeat center center/cover`,
          padding: 4,
        }}
      >
        {/* Left Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img src={img1}
            alt="Left Side Image"
            style={{ width: '90%', height: 'auto' }} />
        </Box>

        {/* Right Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '400px',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            }}
          >
            <Typography
              variant="h5"
              sx={{ marginBottom: 2, fontWeight: 'bold', color: '#137e91',textAlign:'center' }}
            >
              Log In
            </Typography>
            <Box
              component="form"
              sx={{ '& > :not(style)': { mb: 2, width: '100%' } }}
              noValidate
              autoComplete="off"
            >
              <TextField id="user-id" label="User ID" variant="outlined" />
            </Box>

            <FormControl sx={{ mb: 3, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
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

            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#137e91', color: 'white' }}
              onClick={handleLoginClick}
            >
              Log In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginComponent;
