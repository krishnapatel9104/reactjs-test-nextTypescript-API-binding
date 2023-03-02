import {
    Box,
    Button,
    FormHelperText,
    InputLabel,
    NativeSelect,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../../src/store";
import { StepperComp } from "../../src/components/common/StepperComp";
import { YourOrder } from "../../src/components/common/YourOrder";
// import { setUserDetails } from "../../src/store/reducers/userShippingDetails/userShippingDetails.slice";

import { ProtectedRoute } from "../../src/utils/ProtectedRoute";
import { format } from "date-fns";
import { isFuture } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { userShippingDataType } from "../../src/types/redux/userShippingDetails.type";
import { restoreUserSelectedProductList } from "../../src/store/reducers/userSelectedProductList/userSelectedProductList.slice";
import { Formik, Form, FormikProps } from "formik";

import * as Yup from "yup";
import { getCartProductList } from "../../src/store/reducers/productDetailsLists/productLists.api";
import { addShippingDetails } from "../../src/store/reducers/userShippingDetails/userShippingDetails.api";

interface ShippingPageProps {}
const ShippingPage: NextPage<ShippingPageProps> = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cartProductDetails = useSelector(
        (state) => state.productListsSlice.cartItemsDetails
    );
    console.log("redux cartdetaisl shippig page : ", cartProductDetails);

    useEffect(() => {
        if (cartProductDetails?.length === 0) {
            dispatch(getCartProductList(1));
            // let list = JSON.parse(
            //     localStorage.getItem("userSelectedProductList") || ""
            // );
            // if (list?.length > 0) {
            //     dispatch(restoreUserSelectedProductList(list));
            // } else {
            //     router.push("/");
            // }
        }
    });

    useEffect(() => {
        if (cartProductDetails.length === 0) router.push("/");
    }, [cartProductDetails]);

    return (
        <ProtectedRoute>
            <Box
                sx={{
                    marginTop: "50px",
                    display: "flex",
                    padding: {
                        xs: "0 20px",
                        sm: "0 50px",
                        md: "0 20px",
                        lg: "0 60px",
                        xl: "0 150px",
                    },
                    gap: { xs: "10px", lg: "40px" },
                    flexDirection: { xs: "column", sm: "column", md: "row" },
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
                    <StepperComp activeStep={0} />
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
                            Contact Information
                        </Typography>
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                emailAddress: "",
                                phoneNumber: "",
                                deliveryDate: "",
                                convenientTime: "",
                                city: "0",
                                address: "",
                                zipCode: "",
                            }}
                            onSubmit={(values: userShippingDataType) => {
                                // dispatch(setUserDetails(values));
                                dispatch(addShippingDetails(values));
                                router.push("/checkout");
                            }}
                            validationSchema={Yup.object().shape({
                                firstName: Yup.string()
                                    .required("Required")
                                    .matches(
                                        /^.*[A-Za-z ].*$/,
                                        "First name should contain only alphabets"
                                    ),
                                lastName: Yup.string()
                                    .required("Required")
                                    .matches(
                                        /^.*[A-Za-z ].*$/,
                                        "Last name should contain only alphabets"
                                    ),
                                emailAddress: Yup.string()
                                    .email("Invalid Email")
                                    .required("Required"),
                                phoneNumber: Yup.string()
                                    .required("Required")
                                    .matches(
                                        /^.*[987]{1}[0-9]{9}.*$/,
                                        "Phone number should be 10 digit only"
                                    ),
                                deliveryDate: Yup.string()
                                    .required("Required")
                                    .test(
                                        "validateDeliveryDate",
                                        "DeliveryDate should be in future",
                                        (value) => {
                                            if (isFuture(new Date(value)))
                                                return true;
                                        }
                                    ),
                                convenientTime:
                                    Yup.string().required("Required"),
                                city: Yup.string()
                                    .required("Required")
                                    .test(
                                        "validateCity",
                                        "Select city",
                                        (value) => {
                                            if (parseInt(value) !== 0)
                                                return true;
                                        }
                                    ),
                                address: Yup.string().required("Required"),
                                zipCode: Yup.string()
                                    .required("Required")
                                    .matches(
                                        /^.*[0-9]{6}.*$/,
                                        "Zip Code should be 7 digit only"
                                    ),
                            })}
                        >
                            {(props: FormikProps<userShippingDataType>) => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    handleBlur,
                                    handleChange,
                                    isValid,
                                } = props;
                                return (
                                    <Form>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginTop: "20px",
                                                marginBottom: { md: "50px" },
                                                flexDirection: {
                                                    xs: "column",
                                                    lg: "row",
                                                },
                                                alignItems: {
                                                    xs: "flex-start",
                                                },
                                                width: { sm: "100%" },
                                                gap: { md: "40px" },
                                            }}
                                        >
                                            <TextField
                                                id="standard-number"
                                                label="First Name"
                                                type="text"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                name="firstName"
                                                error={
                                                    touched?.firstName &&
                                                    errors?.firstName
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    touched?.firstName &&
                                                    errors?.firstName
                                                        ? errors?.firstName
                                                        : ""
                                                }
                                                value={values.firstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="standard"
                                                placeholder="First Name e.g John,Mary"
                                                sx={{
                                                    fontSize: "22px",
                                                    width: {
                                                        xs: "100%",
                                                        md: "95%",
                                                        lg: "45%",
                                                    },
                                                    marginBottom: {
                                                        xs: "50px",
                                                        md: "0",
                                                    },
                                                    "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root":
                                                        {
                                                            fontSize: "22px",
                                                        },
                                                    "& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root":
                                                        {
                                                            marginTop:
                                                                "30px !important",
                                                        },
                                                    "& .MuiFormHelperText-root":
                                                        {
                                                            color: "red",
                                                        },
                                                }}
                                            />
                                            <TextField
                                                id="standard-number"
                                                label="Last Name"
                                                type="text"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                error={
                                                    touched?.lastName &&
                                                    errors?.lastName
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    touched?.lastName &&
                                                    errors?.lastName
                                                        ? errors?.lastName
                                                        : ""
                                                }
                                                name="lastName"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                variant="standard"
                                                placeholder="Last Name e.g John,Mary"
                                                sx={{
                                                    fontSize: "22px",
                                                    width: {
                                                        xs: "100%",
                                                        md: "95%",
                                                        lg: "45%",
                                                    },
                                                    marginBottom: {
                                                        xs: "50px",
                                                        md: "0",
                                                    },
                                                    "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root":
                                                        {
                                                            fontSize: "22px",
                                                        },
                                                    "& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root":
                                                        {
                                                            marginTop:
                                                                "30px !important",
                                                        },
                                                    "& .MuiFormHelperText-root":
                                                        {
                                                            color: "red",
                                                        },
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                flexDirection: {
                                                    xs: "column",
                                                    lg: "row",
                                                },
                                                alignItems: {
                                                    xs: "flex-start",
                                                },
                                                width: { sm: "100%" },
                                                gap: { md: "40px" },
                                                marginBottom: { md: "50px" },
                                            }}
                                        >
                                            <TextField
                                                id="standard-number"
                                                label="Email Address"
                                                type="email"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                error={
                                                    touched?.emailAddress &&
                                                    errors?.emailAddress
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    touched?.emailAddress &&
                                                    errors?.emailAddress
                                                        ? errors?.emailAddress
                                                        : ""
                                                }
                                                name="emailAddress"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.emailAddress}
                                                variant="standard"
                                                placeholder="Your email@gmail.com"
                                                sx={{
                                                    fontSize: "22px",
                                                    width: {
                                                        xs: "100%",
                                                        md: "95%",
                                                        lg: "45%",
                                                    },
                                                    marginBottom: {
                                                        xs: "50px",
                                                        md: "0",
                                                    },
                                                    "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root":
                                                        {
                                                            fontSize: "22px",
                                                        },
                                                    "& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root":
                                                        {
                                                            marginTop:
                                                                "30px !important",
                                                        },
                                                    "& .MuiFormHelperText-root":
                                                        {
                                                            color: "red",
                                                        },
                                                }}
                                            />
                                            <TextField
                                                id="standard-number"
                                                label="Phone Number"
                                                type="text"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                name="phoneNumber"
                                                error={
                                                    touched?.phoneNumber &&
                                                    errors?.phoneNumber
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    touched?.phoneNumber &&
                                                    errors?.phoneNumber
                                                        ? errors?.phoneNumber
                                                        : ""
                                                }
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.phoneNumber}
                                                variant="standard"
                                                placeholder="+1-(0000 000 0000)"
                                                sx={{
                                                    fontSize: "22px",
                                                    width: {
                                                        xs: "100%",
                                                        md: "95%",
                                                        lg: "45%",
                                                    },
                                                    "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root":
                                                        {
                                                            fontSize: "22px",
                                                        },
                                                    "& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root":
                                                        {
                                                            marginTop:
                                                                "30px !important",
                                                        },
                                                    "& .MuiFormHelperText-root":
                                                        {
                                                            color: "red",
                                                        },
                                                }}
                                            />
                                        </Box>

                                        <Typography
                                            sx={{
                                                fontSize: "22px",
                                                fontWeight: "700",
                                                marginTop: "50px",
                                            }}
                                        >
                                            Delivery Information
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginTop: "20px",
                                                flexDirection: {
                                                    xs: "column",
                                                    sm: "row",
                                                },
                                                alignItems: {
                                                    xs: "flex-start",
                                                },
                                                width: {
                                                    sm: "100%",
                                                    md: "95%",
                                                    lg: "100%",
                                                },
                                                gap: { sm: "50px" },
                                                marginBottom: { md: "40px" },
                                            }}
                                        >
                                            <TextField
                                                id="standard-number"
                                                label="Delivery Date"
                                                type="date"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    inputProps: {
                                                        min: format(
                                                            new Date(),
                                                            "yyyy-MM-dd"
                                                        ),
                                                    },
                                                }}
                                                value={values.deliveryDate}
                                                name="deliveryDate"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={
                                                    touched?.deliveryDate &&
                                                    errors?.deliveryDate
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    touched?.deliveryDate &&
                                                    errors?.deliveryDate
                                                        ? errors.deliveryDate
                                                        : ""
                                                }
                                                variant="standard"
                                                placeholder="DD/MM/YYYY"
                                                sx={{
                                                    fontSize: "22px",
                                                    width: {
                                                        xs: "100%",
                                                        md: "45%",
                                                    },
                                                    marginBottom: {
                                                        xs: "50px",
                                                        md: "0",
                                                    },
                                                    "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root":
                                                        {
                                                            fontSize: "22px",
                                                        },
                                                    "& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root":
                                                        {
                                                            marginTop:
                                                                "30px !important",
                                                        },
                                                }}
                                            />
                                            <TextField
                                                id="standard-number"
                                                label="Convenient Time"
                                                type="time"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                name="convenientTime"
                                                value={values.convenientTime}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={
                                                    touched?.convenientTime &&
                                                    errors?.convenientTime
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    touched?.convenientTime &&
                                                    errors?.convenientTime
                                                        ? errors.convenientTime
                                                        : ""
                                                }
                                                variant="standard"
                                                placeholder="1pm-9pm"
                                                sx={{
                                                    fontSize: "22px",
                                                    width: {
                                                        xs: "100%",
                                                        md: "45%",
                                                    },
                                                    marginBottom: {
                                                        xs: "50px",
                                                        md: "0",
                                                    },
                                                    "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root":
                                                        {
                                                            fontSize: "22px",
                                                        },
                                                    "& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root":
                                                        {
                                                            marginTop:
                                                                "30px !important",
                                                        },
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: {
                                                    xs: "flex-start",
                                                    sm: "center",
                                                },
                                                flexDirection: {
                                                    xs: "column",
                                                    lg: "row",
                                                    md: "column",
                                                },
                                                gap: { sm: "40px" },
                                                width: {
                                                    xs: "100%",
                                                    md: "95%",
                                                    lg: "100%",
                                                },
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: {
                                                        xs: "100%",
                                                        lg: "inherit",
                                                    },
                                                    marginBottom: {
                                                        xs: "50px",
                                                        sm: "0",
                                                    },
                                                }}
                                            >
                                                <InputLabel
                                                    variant="standard"
                                                    htmlFor="uncontrolled-native"
                                                >
                                                    City
                                                </InputLabel>
                                                <NativeSelect
                                                    required
                                                    defaultValue={0}
                                                    inputProps={{
                                                        id: "uncontrolled-native",
                                                    }}
                                                    name="city"
                                                    error={
                                                        touched?.city &&
                                                        errors?.city
                                                            ? true
                                                            : false
                                                    }
                                                    value={values.city}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    sx={{
                                                        width: {
                                                            xs: "100%",
                                                            lg: "inherit",
                                                        },
                                                        marginTop: "10px",
                                                        color: "gray",
                                                    }}
                                                >
                                                    <option value={0}>
                                                        ---Select City---
                                                    </option>
                                                    <option value={"Surat"}>
                                                        Surat
                                                    </option>
                                                    <option value={"Pune"}>
                                                        Pune
                                                    </option>
                                                    <option value={"Mumbai"}>
                                                        Mumbai
                                                    </option>
                                                </NativeSelect>
                                                <FormHelperText
                                                    style={{ color: "red" }}
                                                >
                                                    {/* {errors?.city ? errors?.city : null} */}
                                                    {touched?.city &&
                                                    errors.city ? (
                                                        <div>{errors.city}</div>
                                                    ) : (
                                                        ""
                                                    )}
                                                </FormHelperText>
                                            </Box>
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    width: {
                                                        xs: "100%",
                                                        lg: "inherit",
                                                    },
                                                }}
                                            >
                                                <TextField
                                                    id="standard-number"
                                                    label="Address"
                                                    type="text"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    name="address"
                                                    error={
                                                        touched?.address &&
                                                        errors?.address
                                                            ? true
                                                            : false
                                                    }
                                                    helperText={
                                                        touched?.address &&
                                                        errors?.address
                                                            ? errors?.address
                                                            : ""
                                                    }
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.address}
                                                    variant="standard"
                                                    placeholder="Click to find Address"
                                                    sx={{
                                                        fontSize: "22px",
                                                        marginBottom: {
                                                            xs: "50px",
                                                            sm: "0",
                                                        },
                                                        "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root":
                                                            {
                                                                fontSize:
                                                                    "22px",
                                                            },
                                                        "& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root":
                                                            {
                                                                marginTop:
                                                                    "30px !important",
                                                            },
                                                        "& .MuiFormHelperText-root":
                                                            {
                                                                color: "red",
                                                            },
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        top: {
                                                            xs: "32%",
                                                            sm: "55%",
                                                        },
                                                        right: { xs: "0" },
                                                    }}
                                                >
                                                    <Image
                                                        src={
                                                            "/images/searchgrayicon.png"
                                                        }
                                                        alt="imageGirl"
                                                        height={0}
                                                        width={0}
                                                        sizes="(max-width:0) 100vw,
                        (max-height:0) 100vh"
                                                        style={{
                                                            objectFit: "cover",
                                                            height: "100%",
                                                            width: "100%",
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                            <TextField
                                                id="standard-number"
                                                label="Zip Code"
                                                type="text"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                error={
                                                    touched?.zipCode &&
                                                    errors?.zipCode
                                                        ? true
                                                        : false
                                                }
                                                helperText={
                                                    touched?.zipCode &&
                                                    errors?.zipCode
                                                        ? errors?.zipCode
                                                        : ""
                                                }
                                                name="zipCode"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.zipCode}
                                                variant="standard"
                                                placeholder="00000"
                                                sx={{
                                                    fontSize: "22px",
                                                    "& .css-1c2i806-MuiFormLabel-root-MuiInputLabel-root":
                                                        {
                                                            fontSize: "22px",
                                                        },
                                                    "& label+.css-v4u5dn-MuiInputBase-root-MuiInput-root":
                                                        {
                                                            marginTop:
                                                                "30px !important",
                                                        },
                                                    "& .MuiFormHelperText-root":
                                                        {
                                                            color: "red",
                                                        },
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                marginTop: {
                                                    xs: "50px",
                                                    md: "90px",
                                                },
                                                marginBottom: {
                                                    xs: "100px",
                                                    md: "150px",
                                                },
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
                                                    fontWeight: "900",
                                                    fontSize: "22px",
                                                    lineHeight: "27px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    textAlign: "center",
                                                    color: "#FFFFFF",
                                                    backgroundColor: "#111827",
                                                    width: {
                                                        xs: "100%",
                                                        md: "objectFit",
                                                    },
                                                    padding: {
                                                        xs: "20px",
                                                        md: "15px 100px",
                                                    },
                                                    textTransform: "inherit",
                                                }}
                                                disabled={!isValid}
                                                type="submit"
                                            >
                                                Proceed to Payment
                                            </Button>
                                        </Box>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: { xs: "100%", md: "100%" },
                        paddingTop: "40px",
                    }}
                >
                    <YourOrder />
                </Box>
            </Box>
        </ProtectedRoute>
    );
};
export default ShippingPage;
