import {
    Box,
    Button,
    FormControlLabel,
    FormHelperText,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { StepperComp } from "../../src/components/common/StepperComp";
import { YourOrder } from "../../src/components/common/YourOrder";
import { useDispatch, useSelector } from "../../src/store";
import { resetPaymentDetails } from "../../src/store/reducers/userPaymentDetails/userPaymentDetails.slice";
import { userPaymentDetailsType } from "../../src/types/redux/userPaymentDetails.type";
import { useRouter } from "next/router";
import Image from "next/image";
import { NextPage } from "next";
import { ProtectedRoute } from "../../src/utils/ProtectedRoute";
import { PatternFormat } from "react-number-format";
import { getCartProductList } from "../../src/store/reducers/productDetailsLists/productLists.api";
import {
    addCheckoutDetails,
    addOrderDetails,
} from "../../src/store/reducers/userPaymentDetails/userPaymentDetails.api";
import { cartProductListsType } from "../../src/types/redux/cartProductLists.type";
import { resetShippingDetails } from "../../src/store/reducers/userShippingDetails/userShippingDetails.slice";
import { resetProductLists } from "../../src/store/reducers/productDetailsLists/productLists.slice";

interface CheckoutPageProps {}
const CheckoutPage: NextPage<CheckoutPageProps> = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({
        paymentMethod: "",
        cardName: "",
        cardNumber: "",
        expiration: "",
        cvvCode: "",
    });

    const [paymentData, setPaymentData] = useState<userPaymentDetailsType>({
        paymentMethod: "creditcard",
        cardName: "",
        cardNumber: "",
        expiration: "",
        cvvCode: 0,
    });
    const cartProductDetails = useSelector((state) => state.productListsSlice);

    const shippingData = useSelector((state) => state.userShippingDetailsSlice);

    const checkoutData = useSelector((state) => state.userPaymentDetailsSlice);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "paymentMethod")
            setPaymentData({ ...paymentData, paymentMethod: value });
        if (name === "cardName") {
            if (value === "") {
                setErrors({ ...errors, [name]: "Required" });
            } else if (!/^[A-Za-z ]*$/i.test(value)) {
                setErrors({
                    ...errors,
                    [name]: "Card name should contain only alphabet",
                });
            } else {
                setErrors({ ...errors, [name]: "" });
                setPaymentData({ ...paymentData, cardName: value });
            }
        }
        if (name === "cardNumber") {
            if (value === "") {
                setErrors({ ...errors, [name]: "Required" });
            } else if (!/^[0-9]{12}$/i.test(value)) {
                setErrors({
                    ...errors,
                    [name]: "Card number should be 12 digit only",
                });
            } else {
                setErrors({ ...errors, [name]: "" });
                setPaymentData({ ...paymentData, cardNumber: value });
            }
        }
        if (name === "cvvCode") {
            if (value === "") {
                setErrors({ ...errors, [name]: "Required" });
            } else if (!/^[0-9]{3}$/i.test(value)) {
                setErrors({
                    ...errors,
                    [name]: "CVV Code should be 3 digit only",
                });
            } else {
                setErrors({ ...errors, [name]: "" });
                setPaymentData({ ...paymentData, cvvCode: parseInt(value) });
            }
        }
        if (name === "expiration") {
            let month = value.substring(0, 2);
            let year = value.substring(3, 5);
            let curMonth = (new Date().getMonth() + 1)
                .toString()
                .padStart(2, "0");
            let curYear = new Date().getFullYear().toString().slice(-2);
            if (month.includes("_") || year.includes("_")) {
                setErrors({ ...errors, expiration: "Enter Properly" });
            } else if (parseInt(month) > 12 || parseInt(month) === 0) {
                setErrors({ ...errors, expiration: "Month Invalid" });
            } else if (
                (month < curMonth && year < curYear) ||
                (month < curMonth && year <= curYear) ||
                year < curYear ||
                month < curMonth
            ) {
                setErrors({
                    ...errors,
                    expiration: "Expiration must be in future",
                });
            } else {
                setErrors({ ...errors, expiration: "" });
                setPaymentData({ ...paymentData, expiration: value });
            }
        }
    };

    useEffect(() => {
        if (cartProductDetails.cartItemsDetails?.length === 0) {
            dispatch(getCartProductList(1));
        }
    });

    useEffect(() => {
        if (cartProductDetails.cartItemsDetails.length === 0) router.push("/");
    }, [cartProductDetails.cartItemsDetails]);

    const isValidate = () => {
        if (
            paymentData.paymentMethod &&
            paymentData.cardName &&
            paymentData.cardNumber &&
            paymentData.expiration &&
            paymentData.cvvCode
        )
            return true;
        else return false;
    };
    const resetRedux = () => {
        dispatch(resetShippingDetails());
        dispatch(resetPaymentDetails());
        dispatch(resetProductLists());
    };
    useEffect(() => {
        if (shippingData.shippingId !== 0 && checkoutData.checkoutId !== 0) {
            let payload: cartProductListsType = cartProductDetails;
            payload = {
                ...payload,
                shippingId: shippingData.shippingId,
            };
            payload = {
                ...payload,
                checkoutId: checkoutData.checkoutId,
            };
            dispatch(addOrderDetails(payload));
            resetRedux();
        }
    }, [shippingData, checkoutData]);

    const handleClick = () => {
        if (isValidate()) {
            dispatch(addCheckoutDetails(paymentData));
            router.push("/confirmation");
        }
    };

    return (
        <ProtectedRoute>
            <Box
                sx={{
                    marginTop: "50px",
                    display: "flex",
                    padding: {
                        xs: "0 40px",
                        sm: "0 50px",
                        md: "0 90px",
                        lg: "0 60px",
                        xl: "0 150px",
                    },
                    gap: { xs: "10px", lg: "40px" },
                    flexDirection: { xs: "column", lg: "row" },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        flexDirection: "column",
                    }}
                >
                    <StepperComp activeStep={1} />
                    <Box
                        sx={{
                            padding: { xs: "0", md: "0" },
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "22px",
                                fontWeight: "700",
                                marginTop: "80px",
                            }}
                        >
                            Payment Method
                        </Typography>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="paymentMethod"
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: { sm: "50px" },
                                justifyContent: {
                                    xs: "space-between",
                                    sm: "inherit",
                                },
                            }}
                            onChange={handleChange}
                            value={paymentData.paymentMethod}
                        >
                            <Box>
                                <FormControlLabel
                                    value="creditcard"
                                    control={<Radio />}
                                    label=""
                                />
                                <Image
                                    src="/images/paymenticon1.png"
                                    alt="paymenticon1"
                                    height={34}
                                    width={46}
                                />
                            </Box>
                            <Box sx={{ display: "flex" }}>
                                <FormControlLabel
                                    value="paypal"
                                    control={<Radio />}
                                    label=""
                                />
                                <Image
                                    src="/images/paymenticon2.png"
                                    alt="paymenticon2"
                                    height={80}
                                    width={100}
                                />
                            </Box>
                            <Box>
                                <FormControlLabel
                                    value="other"
                                    control={<Radio />}
                                    label=""
                                />
                                <Image
                                    src="/images/paymenticon3.png"
                                    alt="paymenticon3"
                                    height={34}
                                    width={46}
                                />
                            </Box>
                        </RadioGroup>
                        <Typography
                            sx={{
                                fontSize: "22px",
                                fontWeight: "700",
                                marginTop: "50px",
                            }}
                        >
                            Payment Details
                        </Typography>
                        <Box
                            sx={{
                                marginTop: "20px",
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: { xs: "flex-start" },
                                width: { sm: "100%" },
                                gap: { sm: "100px" },
                                marginBottom: { md: "50px" },
                            }}
                        >
                            <TextField
                                id="standard-number"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="cardName"
                                error={errors?.cardName ? true : false}
                                helperText={
                                    errors?.cardName ? errors?.cardName : null
                                }
                                onChange={handleChange}
                                variant="standard"
                                placeholder="Enter Name Card"
                                sx={{
                                    fontSize: "22px",
                                    width: "100%",
                                    "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root":
                                        {
                                            fontSize: "22px",
                                        },
                                    "& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root":
                                        {
                                            marginTop: "30px !important",
                                        },
                                    "& .MuiFormHelperText-root": {
                                        color: "red",
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ marginTop: "50px", position: "relative" }}>
                            <TextField
                                id="standard-number"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="cardNumber"
                                error={errors?.cardNumber ? true : false}
                                helperText={
                                    errors?.cardNumber
                                        ? errors?.cardNumber
                                        : null
                                }
                                onChange={handleChange}
                                variant="standard"
                                placeholder="Card Number"
                                sx={{
                                    fontSize: "22px",
                                    width: "100%",
                                    "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root":
                                        {
                                            fontSize: "22px",
                                        },
                                    "& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root":
                                        {
                                            marginTop: "30px !important",
                                        },
                                    "& .MuiFormHelperText-root": {
                                        color: "red",
                                    },
                                }}
                            />
                            <Image
                                src="/images/visa.png"
                                alt="visa"
                                height={13}
                                width={35}
                                style={{
                                    position: "absolute",
                                    top: "20%",
                                    right: "2%",
                                }}
                            />
                            <Image
                                src="/images/visaangle.png"
                                alt="visaangle"
                                height={10}
                                width={10}
                                style={{
                                    position: "absolute",
                                    top: "20%",
                                    right: "0%",
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "50px",
                                width: "100%",
                            }}
                        >
                            <Box
                                sx={{
                                    dislay: "flex",
                                    flexDirection: "column",
                                    width: "45%",
                                    gap: "20px",
                                }}
                            >
                                <PatternFormat
                                    name="expiration"
                                    format="##/##"
                                    allowEmptyFormatting
                                    mask="_"
                                    style={{
                                        border: "none",
                                        borderBottom: "1px solid #c9c1c1",
                                        width: "100%",
                                        height: "32px",
                                    }}
                                    onChange={handleChange}
                                />
                                <FormHelperText style={{ color: "red" }}>
                                    {errors?.expiration
                                        ? errors?.expiration
                                        : null}
                                </FormHelperText>
                            </Box>
                            <TextField
                                id="standard-number"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="cvvCode"
                                error={errors?.cvvCode ? true : false}
                                helperText={
                                    errors?.cvvCode ? errors?.cvvCode : null
                                }
                                onChange={handleChange}
                                variant="standard"
                                placeholder="CVV Code"
                                sx={{
                                    fontSize: "22px",
                                    width: "45%",
                                    "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root":
                                        {
                                            fontSize: "22px",
                                        },
                                    "& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root":
                                        {
                                            marginTop: "30px !important",
                                        },
                                    "& .MuiFormHelperText-root": {
                                        color: "red",
                                    },
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                marginTop: "50px",
                                fontFamily: "Nunito",
                                fontWeight: "400",
                                fontSize: "18px",
                                color: "#C4C4C4",
                                letterSpacing: "1.5px",
                            }}
                        >
                            By Clicking *Confirm Payment* I agree to
                            <br /> company terms of services
                        </Box>
                        <Box
                            sx={{
                                marginTop: "90px",
                                marginBottom: { xs: "90px", xl: "150px" },
                                display: "flex",
                                gap: "20px",
                                flexFlow: {
                                    xs: "column-reverse",
                                    sm: "column-reverse",
                                    md: "column-reverse",
                                    xl: "inherit",
                                },
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexDirection: { xs: "column", xl: "row" },
                            }}
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSyle: "normal",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                    lineHeight: "27px",
                                    display: "flex",
                                    alignItems: "center",
                                    textAlign: "center",
                                    color: "#111827",
                                    width: { xs: "100%", xl: "45px" },
                                    height: "60px",
                                    padding: "15px 100px",
                                    textTransform: "inherit",
                                    backgroundColor: "white",
                                    border: "1px solid black",
                                }}
                                onClick={() => router.push("/shipping")}
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    fontFamily: "Nunito",
                                    fontSyle: "normal",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                    lineHeight: "27px",
                                    display: "flex",
                                    alignItems: "center",
                                    textAlign: "center",
                                    color: "#FFFFFF",
                                    width: { xs: "100%" },
                                    padding: "20px 80px",
                                    textTransform: "inherit",
                                    backgroundColor: "#111827",
                                }}
                                onClick={handleClick}
                                disabled={!isValidate()}
                            >
                                Confirm Payment
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: { xs: "100%", md: "100%" },
                        paddingTop: "40px",
                    }}
                >
                    <YourOrder isCheckout={true} />
                </Box>
            </Box>
        </ProtectedRoute>
    );
};
export default CheckoutPage;
