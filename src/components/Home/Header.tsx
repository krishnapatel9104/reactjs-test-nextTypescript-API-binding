import { Box, Typography } from '@mui/material';
import React from 'react';
import { CoverSection } from './CoverSection';

import theme from '../../theme';

export const Header = () => {
  return (
    <>
      <CoverSection />
      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          marginTop: {
            xs: '-220px',
            md: '-370px',
            lg: '-390px',
            xl: '-500px'
          }
        }}>
        <Typography
          sx={{
            margin: 0,
            fontWeight: '400',
            fontFamily: theme.typography.h1.fontFamily,
            fontSize: {
              xl: '39px',
              lg: '36px',
              md: '30px',
              sm: '25px',
              xs: '21px'
            },
            color: theme.palette.secondary.main,
            textAlign: 'center'
          }}>
          With an outstanding style, only for you
        </Typography>
        <Typography
          sx={{
            margin: 0,
            fontFamily: theme.typography.h1.fontFamily,
            fontWeight: '700',
            fontSize: {
              xl: '95px',
              lg: '75px',
              md: '55px',
              sm: '40px',
              xs: '25px'
            },
            textAlign: 'center',
            color: theme.palette.primary.main,
            marginBottom: { xs: '20px', sm: '0' }
          }}>
          Exclusively designed for you
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
          <Box
            sx={{
              height: {
                xl: '600px',
                md: '450px',
                xs: '250px'
              },
              width: {
                xl: '600px',
                md: '450px',
                xs: '250px'
              },
              position: 'relative',
              backgroundImage: `url("/images/left.png")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain'
            }}>
            <Typography
              sx={{
                fontFamily: theme.typography.h2.fontFamily,
                fontWeight: '700',
                color: theme.palette.secondary.main,
                gap: '10px',
                fontSize: {
                  xl: '20px',
                  lg: '20px',
                  md: '18px',
                  xs: '15px'
                },
                padding: {
                  xl: '10px 50px',
                  lg: '10px 50px',
                  md: '10px 50px',
                  xs: '8px 25px'
                },
                marginTop: {
                  xl: '300px',
                  lg: '200px',
                  md: '200px',
                  xs: '110px'
                },
                marginLeft: {
                  xl: '250px',
                  lg: '150px',
                  md: '150px',
                  xs: '80px'
                },
                backgroundColor: 'white',
                width: 'fit-content'
              }}>
              For Her
            </Typography>
          </Box>
          <Box
            sx={{
              height: {
                xl: '600px',
                md: '450px',
                xs: '250px'
              },
              width: {
                xl: '600px',
                md: '450px',
                xs: '250px'
              },
              position: 'relative',
              backgroundImage: `url("/images/right.png")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain'
            }}>
            <Typography
              sx={{
                fontFamily: theme.typography.h2.fontFamily,
                fontWeight: '700',
                color: theme.palette.secondary.main,
                gap: '10px',
                fontSize: {
                  xl: '20px',
                  lg: '20px',
                  md: '18px',
                  xs: '15px'
                },
                padding: {
                  xl: '10px 50px',
                  lg: '10px 50px',
                  md: '10px 50px',
                  xs: '8px 25px'
                },
                marginTop: {
                  xl: '300px',
                  lg: '200px',
                  md: '200px',
                  xs: '110px'
                },
                marginLeft: {
                  xl: '250px',
                  lg: '150px',
                  md: '150px',
                  xs: '80px'
                },
                backgroundColor: 'white',
                width: 'fit-content'
              }}>
              For Him
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
