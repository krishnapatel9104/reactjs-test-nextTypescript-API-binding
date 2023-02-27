import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { StepperComp } from '../../src/components/common/StepperComp';
import { useSelector, useDispatch } from '../../src/store';
import { resetPaymentDetails } from '../../src/store/reducers/userPaymentDetails/userPaymentDetails.slice';
import { resetUserSelectedProductList } from '../../src/store/reducers/userSelectedProductList/userSelectedProductList.slice';
import { resetShippingDetails } from '../../src/store/reducers/userShippingDetails/userShippingDetails.slice';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ProtectedRoute } from '../../src/utils/ProtectedRoute';
import { restoreUserSelectedProductList } from '../../src/store/reducers/userSelectedProductList/userSelectedProductList.slice';

interface ConfirmationPageProps {}
const ConfirmationPage: NextPage<ConfirmationPageProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const reduxProductDetail = useSelector(state => state.userSelectedProductListSlice);
  useEffect(() => {
    if (reduxProductDetail?.cartProductDetails?.length === 0) {
      if (localStorage.getItem('userSelectedProductList')) {
        let list = JSON.parse(localStorage.getItem('userSelectedProductList') || '');
        if (list?.length > 0) {
          dispatch(restoreUserSelectedProductList(list));
        } else {
          router.push('/');
        }
      }
    }
  });

  const handleClick = () => {
    localStorage.removeItem('userSelectedProductList');
    dispatch(resetShippingDetails());
    dispatch(resetPaymentDetails());
    dispatch(resetUserSelectedProductList());
    router.push('/');
  };
  return (
    <ProtectedRoute>
      <Box
        sx={{
          textAlign: 'center',
          marginTop: '50px'
        }}>
        <Box>
          <StepperComp activeStep={2} />
        </Box>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontWeight: '700',
            fontSize: '24px',
            marginTop: '50px'
          }}>
          Your order is confirmed
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontWeight: '400',
            fontSize: '18px',
            marginTop: '50px'
          }}>
          Thank you for shopping with us Your order will
          <br /> reach you on {new Date().toLocaleDateString()}
        </Typography>
        <Box
          sx={{
            marginTop: '500px',
            marginBottom: '100px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Button
            variant="contained"
            sx={{
              fontFamily: 'Nunito',
              fontSyle: 'normal',
              fontWeight: '700',
              fontSize: { xs: '20px', sm: '30px' },
              lineHeight: '35px',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              color: '#FFFFFF',
              backgroundColor: '#111827',
              width: 'objectFit',
              padding: { xs: '10px 50px', sm: '15px 100px' },
              textTransform: 'inherit'
            }}
            onClick={() => handleClick()}>
            Continue Shopping
          </Button>
        </Box>
      </Box>
    </ProtectedRoute>
  );
};
export default ConfirmationPage;
