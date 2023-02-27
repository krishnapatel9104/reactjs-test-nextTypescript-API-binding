import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import theme from '../../theme';
import Image from 'next/image';

export const Footer = () => {
  return (
    <Box
      sx={{
        marginBottom: '20px'
      }}>
      <Box
        sx={{
          marginTop: '50px',
          display: 'flex',
          justifyContent: { xs: 'flex-start', sm: 'space-between' },
          padding: {
            xs: '0 50px',
            sm: '0 70px',
            md: '0 80px',
            lg: '0 170px'
          },
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
        <Box
          sx={{
            display: 'flex',
            gap: {
              xs: '50px',
              sm: '20px',
              md: '30px',
              lg: '80px',
              xl: '120px'
            },
            textAlign: 'left',
            justifyContent: { xs: 'flex-start', md: 'inherit' },
            flexDirection: { xs: 'column', sm: 'row' }
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: '20px', sm: '30px' }
            }}>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '700',
                fontSize: { xs: '17px', md: '20px' },
                color: theme.palette.primary.main
              }}>
              Company Info
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.contrastText
              }}>
              About Us
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.contrastText
              }}>
              Affliate
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.contrastText
              }}>
              Fashion Blogger
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px'
            }}>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '700',
                fontSize: { xs: '17px', md: '20px' },
                color: theme.palette.primary.main
              }}>
              Help & Support
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.contrastText
              }}>
              Shipping Info
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.contrastText
              }}>
              Refunds
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.contrastText
              }}>
              How to Order
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.contrastText
              }}>
              How to Track
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.contrastText
              }}>
              Size Guides
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '30px'
            }}>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '700',
                fontSize: { xs: '17px', md: '20px' },
                color: theme.palette.primary.main
              }}>
              Customer Care
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.contrastText
              }}>
              Contact Us
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.contrastText
              }}>
              Payment Methods
            </Typography>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '400',
                fontSize: '16px',
                color: theme.palette.secondary.contrastText
              }}>
              Bonus Point
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: 'left',
            marginTop: { xs: '35px', sm: '0' }
          }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
            <Typography
              sx={{
                fontFamily: theme.typography.h1.fontFamily,
                fontWeight: '700',
                fontSize: { xs: '17px', md: '20px' },
                color: theme.palette.primary.main
              }}>
              Signup For The Latest News
            </Typography>
            <Box
              sx={{
                marginBottom: '10px',
                position: 'relative'
              }}>
              <TextField id="outlined-basic" label="Enter Email" variant="outlined" />
              <Box
                sx={{
                  position: 'absolute',
                  right: { xs: '45%', sm: '10%' },
                  top: '35%'
                }}>
                <Image
                  src={'/images/arrow.png'}
                  alt="arrowIcon"
                  width={15}
                  height={15}
                />
              </Box>
            </Box>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
              <Box
                sx={{
                  fontSize: { xs: '14px', md: '16px' },
                  color: theme.palette.secondary.contrastText,
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                <EmailOutlinedIcon
                  sx={{
                    fontSize: { xs: '17px', md: '20px' }
                  }}
                />
                <Typography>something@email.com</Typography>
              </Box>
              <Box
                sx={{
                  fontSize: { xs: '14px', md: '16px' },
                  color: theme.palette.secondary.contrastText
                }}>
                <Box
                  sx={{
                    fontSize: { xs: '17px', md: '20px' },
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                  <Image src="/images/Call.png" alt="imageGirl" height={15} width={15} />
                  <Typography>+2321354524</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          justifyContent: 'center',
          marginTop: '50px'
        }}>
        <Image
          src={'/images/fb.png'}
          alt="socialIcon"
          width={0}
          height={0}
          sizes="(max-width:0) 10vw,
                                (max-height:0) 10vh"
          style={{
            objectFit: 'cover',
            position: 'inherit',
            height: '0%',
            width: '1%'
          }}
        />
        <Image
          src={'/images/instagram.png'}
          alt="socialIcon"
          width={0}
          height={0}
          sizes="(max-width:0) 10vw,
                                (max-height:0) 10vh"
          style={{
            objectFit: 'cover',
            position: 'inherit',
            height: '0%',
            width: '1.5%'
          }}
        />
        <Image
          src={'/images/youtube.png'}
          alt="socialIcon"
          width={0}
          height={0}
          sizes="(max-width:0) 10vw,
                                (max-height:0) 10vh"
          style={{
            objectFit: 'cover',
            position: 'inherit',
            height: '0%',
            width: '1.5%'
          }}
        />
        <Image
          src={'/images/twitter.png'}
          alt="socialIcon"
          width={0}
          height={0}
          sizes="(max-width:0) 10vw,
                                (max-height:0) 10vh"
          style={{
            objectFit: 'cover',
            position: 'inherit',
            height: '0%',
            width: '1.5%'
          }}
        />
      </Box>
      <Box
        sx={{
          border: '1px solid #9E9E9E',
          padding: '0',
          width: { xs: '85%', sm: '82%' },
          margin: '30px auto 17px auto'
        }}></Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'space-around', md: 'space-between' },
          padding: { xs: '0 40px', md: '0 100px', lg: '0 170px' },
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
        <Typography
          sx={{
            fontFamily: theme.typography.h1.fontFamily,
            fontWeight: '700',
            fontSize: '14px',
            color: '#6C7E99'
          }}>
          <span
            style={{
              fontFamily: theme.typography.h1.fontFamily,
              fontWeight: '400',
              fontSize: '14px',
              color: '#7E92B3'
            }}>
            All rights Reserved
          </span>{' '}
          &copy; Your Company, 2021
        </Typography>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: theme.typography.h1.fontFamily,
            fontWeight: '700',
            fontSize: '14px',
            color: '#6C7E99'
          }}>
          <Image src={'/images/madewithbyicon.png'} alt="socialIcon" width={100} height={15} />{' '}
          &nbsp; Themewagon
        </Typography>
      </Box>
    </Box>
  );
};
