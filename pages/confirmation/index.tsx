import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { StepperComp } from "../../src/components/common/StepperComp";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ProtectedRoute } from "../../src/utils/ProtectedRoute";
import { resetPaymentDetails } from "../../src/store/reducers/userPaymentDetails/userPaymentDetails.slice";
import { resetShippingDetails } from "../../src/store/reducers/userShippingDetails/userShippingDetails.slice";
import { resetProductLists } from "../../src/store/reducers/productDetailsLists/productLists.slice";
import { useDispatch } from "../../src/store";

interface ConfirmationPageProps {}
const ConfirmationPage: NextPage<ConfirmationPageProps> = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetShippingDetails());
        dispatch(resetPaymentDetails());
        dispatch(resetProductLists());
    }, []);

    const router = useRouter();
    return (
        <ProtectedRoute>
            <Box
                sx={{
                    textAlign: "center",
                    marginTop: "50px",
                }}
            >
                <Box>
                    <StepperComp activeStep={2} />
                </Box>
                <Typography
                    sx={{
                        fontFamily: "Roboto",
                        fontWeight: "700",
                        fontSize: "24px",
                        marginTop: "50px",
                    }}
                >
                    Your order is confirmed
                </Typography>
                <Typography
                    sx={{
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        fontSize: "18px",
                        marginTop: "50px",
                    }}
                >
                    Thank you for shopping with us Your order will
                    <br /> reach you on {new Date().toLocaleDateString()}
                </Typography>
                <Box
                    sx={{
                        marginTop: "500px",
                        marginBottom: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            fontFamily: "Nunito",
                            fontSyle: "normal",
                            fontWeight: "700",
                            fontSize: { xs: "20px", sm: "30px" },
                            lineHeight: "35px",
                            display: "flex",
                            alignItems: "center",
                            textAlign: "center",
                            color: "#FFFFFF",
                            backgroundColor: "#111827",
                            width: "objectFit",
                            padding: { xs: "10px 50px", sm: "15px 100px" },
                            textTransform: "inherit",
                        }}
                        onClick={() => router.push("/")}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Box>
        </ProtectedRoute>
    );
};
export default ConfirmationPage;
