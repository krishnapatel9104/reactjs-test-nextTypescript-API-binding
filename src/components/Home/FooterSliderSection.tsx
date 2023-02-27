import { Box, Typography } from '@mui/material';
import { width } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import theme from '../../theme';

export const FooterSliderSection = () => {
  return (
    <Box
      sx={{
        position: 'relative'
      }}>
      <Image
        src="/images/footersliderimage.png"
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
      <Box
        sx={{
          position: 'absolute',
          top: '0%',
          height: '100%',
          width: '100%'
        }}>
        <Image
          src="/images/overlay.png"
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
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '15%', sm: '20%', md: '20%', lg: '30%' },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '10px', md: '20px' },
          left: { xs: '35%', sm: '40%', md: '35%', lg: '42%' },
          alignItems: 'center'
        }}>
        <Typography
          sx={{
            fontFamily: theme.typography.h1.fontFamily,
            fontWeight: '400',
            fontSize: {
              lg: '39px',
              md: '32px',
              sm: '22px',
              xs: '18px'
            },
            textAlign: 'center',
            color: '#E0E0E0'
          }}>
          Visit our outlets in
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <Box>
            <Image src={'/images/vectorleftwhite.png'} alt="footerslider" width={20} height={20} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: {
                  lg: '95px',
                  md: '75px',
                  sm: '32px',
                  xs: '22px'
                },
                textAlign: 'center',
                color: '#FFFFFF'
              }}>
              Berlin
            </Typography>
          </Box>
          <Box>
            <Image src={'/images/vectorrightwhite.png'} alt="footerslider" width={20} height={20} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center'
          }}>
          <Typography
            sx={{
              fontFamily: theme.typography.h1.fontFamily,
              fontWeight: '700',
              fontSize: {
                lg: '20px',
                sm: '18px',
                xs: '16px'
              },
              color: '#FFFFFF'
            }}>
            See Addresses
          </Typography>
          <Image src={'/images/arrowwhite.png'} alt="footerslider" width={25} height={25} />
        </Box>
      </Box>
    </Box>
  );
};
