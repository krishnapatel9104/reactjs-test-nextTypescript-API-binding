import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import theme from '../../theme';
import { cardFooterInformation } from '../../data/cardFooterInformation';
import Image from 'next/image';
export const CardFooterSection = () => {
  return (
    <Box
      sx={{
        marginTop: '50px',
        padding: {
          xs: '0px 30px',
          sm: '50px 65px',
          lg: '50px 250px'
        }
      }}>
      <Grid
        container
        sx={{
          flexDirection: { xs: 'row' }
        }}>
        {cardFooterInformation.map(product => {
          return (
            <Grid item xs={12} sm={6} lg={4} xl={4} key={product.id}>
              <Box
                sx={{
                  position: 'relative',
                  marginBottom: {
                    xs: '500px',
                    sm: '500px',
                    md: '450px'
                  }
                }}>
                <Image
                  src={product.imageSource}
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
                    top: '90%',
                    padding: {
                      xs: '0 20px',
                      sm: '0 15px',
                      md: '0 50px',
                      lg: '0 15px',
                      xl: '0 65px'
                    }
                  }}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'center',
                      background: '#FCFCFC',
                      marginBottom: '25px'
                    }}>
                    <Image
                      src={product.secondaryImageSource}
                      alt={'imageGirl'}
                      height={89}
                      width={89}
                    />
                    <Box>
                      <Image
                        src={'/images/view.png'}
                        alt={'imageGirl'}
                        width={17}
                        height={14}
                        style={{ marginRight: '10px' }}
                      />
                      {product.views}
                    </Box>
                    <Box>
                      <Image
                        src={'/images/Like.png'}
                        alt={'imageGirl'}
                        width={17}
                        height={14}
                        style={{ marginRight: '10px' }}
                      />
                      {product.likes}
                    </Box>
                    <Box>
                      <Image
                        src={'/images/arrow.png'}
                        alt={'imageGirl'}
                        width={17}
                        height={14}
                        style={{ marginRight: '10px' }}
                      />
                      {product.shares}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '30px',
                      textAlign: 'left'
                    }}>
                    <Typography
                      sx={{
                        fontFamily: theme.typography.h1.fontFamily,
                        fontWeight: '700',
                        fontSize: '16px',
                        color: theme.palette.secondary.main,
                        textAlign: 'left'
                      }}>
                      {product.title} .
                      <span
                        style={{
                          fontFamily: theme.typography.h1.fontFamily,
                          fontWeight: '400',
                          fontSize: '16px',
                          color: theme.palette.secondary.main
                        }}>
                        {product.subTitle}
                      </span>
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: theme.typography.h1.fontFamily,
                        fontWeight: '700',
                        fontSize: '25px',
                        color: theme.palette.primary.main
                      }}>
                      {product.question}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: theme.typography.h4.fontFamily,
                        fontWeight: '400',
                        fontSize: '16px',
                        color: theme.palette.secondary.main
                      }}>
                      {product.answer}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'center'
                      }}>
                      <Typography>Read more</Typography>
                      <span>
                        <Image src={'/images/arrow.png'} alt={'imageGirl'} width={18} height={18} />
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
