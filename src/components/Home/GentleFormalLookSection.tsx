import { Box, Button, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import theme from '../../theme';

export const GentleFormalLookSection = () => {
  return (
    <Box
      sx={{
        padding: {
          xs: '0px 30px',
          sm: '50px 65px',
          lg: '50px 250px'
        },
        marginTop: '50px',
        marginBottom: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Grid container>
        <Grid
          item
          sm={6}
          sx={{
            height: { xs: '500px', xl: '700px' },
            backgroundColor: '#EEEEEE',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 0,
            paddingTop: 0
          }}>
          <Box
            sx={{
              padding: { xs: '0 10px', sm: '0 40px' }
            }}>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '700',
                fontSize: {
                  xs: '22px',
                  md: '36px',
                  lg: '40px',
                  xl: '42px'
                },
                color: theme.palette.primary.main
              }}>
              Gentle Formal Looks
            </Typography>
            <Typography
              sx={{
                textAlign: 'left',
                fontFamily: theme.typography.h4.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.main
              }}>
              We provide the top formal apparel package to make your job look confident and
              comfortable. Stay connect.
            </Typography>
            <Box sx={{ textAlign: 'left' }}>
              <Button
                variant="contained"
                sx={{
                  marginTop: '50px',
                  padding: {
                    xs: '5px 25px',
                    sm: '10px 40px'
                  },
                  background: '#212121',
                  fontFamily: theme.typography.h1.fontFamily,
                  fontWeight: '700',
                  fontSize: { xs: '14px', sm: '20px' },
                  color: '#FFFFFF'
                }}>
                Explore Collection
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sm={6}
          sx={{
            height: { xs: '500px', xl: '700px' }
          }}>
          <Image
            src={'/images/Imagemen.png'}
            alt="imageGirl"
            height={0}
            width={0}
            sizes="(max-width:0) 100vw,
                                (max-height:0) 100vh"
            style={{
              objectFit: 'cover',
              height: '100%',
              width: '100%'
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
