import { Box, Button, TextField } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

interface LoginPageProps {}
const LoginPage: NextPage<LoginPageProps> = () => {
  const [userData, setUserData] = useState<{ userName: string; password: string }>({
    userName: '',
    password: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.setItem('isLoggedIn', true.toString());
    setTimeout(() => {
      router.push('/');
    }, 500);
  };
  useEffect(() => {
    const userData = localStorage.getItem('isLoggedIn');
    if (userData !== null && userData === true.toString()) {
      router.push('/');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name === 'userName' &&
      (e.target.value === '' || e.target.value !== 'krishnaPatel9104')
    ) {
      setError('Opps! Wrong username!!!');
    } else if (
      e.target.name === 'password' &&
      (e.target.value === '' || e.target.value !== 'krishil9104')
    ) {
      setError('Opps! Wrong password!!!');
    } else {
      setError('');
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };
  return (
    <form>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingTop: '10%',
          gap: '20px'
        }}>
        {error && <Box sx={{ color: 'red', fontSize: '22px' }}>{error}</Box>}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '40px',
            backgroundColor: '#EFEFEF',
            height: '500px',
            width: '30%',
            padding: '0 50px'
          }}>
          <TextField
            id="standard-number"
            label="User Name"
            type="text"
            InputLabelProps={{
              shrink: true
            }}
            onChange={handleChange}
            name="userName"
            variant="standard"
            placeholder="Enter username"
            sx={{
              fontSize: '22px',
              width: '100%',
              marginBottom: { xs: '50px', md: '0' },
              '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
                fontSize: '22px'
              },
              '& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root': {
                marginTop: '30px !important'
              },
              '& .MuiFormHelperText-root': {
                color: 'red'
              }
            }}
          />
          <TextField
            id="standard-number"
            label="Password"
            type="text"
            InputLabelProps={{
              shrink: true
            }}
            onChange={handleChange}
            name="password"
            variant="standard"
            placeholder="Enter password"
            sx={{
              fontSize: '22px',
              width: '100%',
              marginBottom: { xs: '50px', md: '0' },
              // '& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root': {
              //   fontSize: '22px'
              // },
              // '& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root': {
              //   marginTop: '30px !important'
              // },
              '& .MuiFormHelperText-root': {
                color: 'red'
              }
            }}
          />
          <Button
            className="btn-success mt-2"
            id="login-btn"
            sx={{ backgroundColor: 'lightgray', color: 'black', width: '100%' }}
            onClick={e => handleClick(e)}>
            Login
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default LoginPage;
