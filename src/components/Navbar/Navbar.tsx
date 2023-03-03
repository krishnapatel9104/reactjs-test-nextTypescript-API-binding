import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "../../theme";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "../../store";
import { brandType } from "../../types/constants/brand.type";
import { categoryType } from "../../types/constants/category.type";
import { genderType } from "../../types/constants/gender.type";
import axios, { AxiosError, AxiosResponse } from "axios";
import baseURL from "../../api";
import { getCartProductList } from "../../store/reducers/productDetailsLists/productLists.api";

const Navbar = () => {
    const themes = useTheme();
    const matches = useMediaQuery(themes.breakpoints.down("md"));
    const router = useRouter();
    const dispatch = useDispatch();
    const cartProductLists = useSelector(
        (state) => state.productListsSlice.cartItemsDetails
    );
    const [brandLists, setBrandLists] = useState<brandType[]>();
    const [categoryLists, setCategoryLists] = useState<categoryType[]>();
    const [genderLists, setGenderLists] = useState<genderType[]>();
    const [totalItems, setTotalItems] = useState<number>(0);

    useEffect(() => {
        if (cartProductLists?.length > 0) {
            let total = 0;
            cartProductLists.forEach((product) => {
                total += product.quantity;
            });
            setTotalItems(total);
        }
    }, [cartProductLists]);

    useEffect(() => {
        const callApi = async () => {
            await axios
                .get(`${baseURL}/brand`, {
                    headers: {
                        Authorization: `${
                            localStorage.getItem("token")
                        }`,
                    },
                })
                .then((response) => {
                    setBrandLists(response.data);
                })
                .catch((error) => {
                    console.log("ERROR OF AUTHOERIZATION :::::: ", error);
                    if (error.response.status === 401) {
                        console.log(
                            "TOKENNNNN : ",
                            localStorage.getItem("token")
                        );
                        // localStorage.removeItem("token");
                        // localStorage.removeItem("isLoggedIn");
                        // router.push("/login");
                    }
                });
            await axios.get(`${baseURL}/category`).then((response) => {
                setCategoryLists(response.data);
            });
            await axios.get(`${baseURL}/gender`).then((response) => {
                setGenderLists(response.data);
            });
        };
        callApi();
        if (cartProductLists?.length === 0) {
            dispatch(getCartProductList(1));
        }
    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [selectedGender, setSelectedGender] = useState<string>();
    const archivedCollectionsList: { id: number; value: string }[] = [
        { id: 1, value: "All Products" },
        { id: 2, value: "Accessories" },
        { id: 3, value: "Bags" },
        { id: 4, value: "Coats" },
        { id: 5, value: "Dresses" },
        { id: 6, value: "Shoes" },
        { id: 7, value: "Suits" },
    ];

    useEffect(() => {
        setIsOpen(false);
        setIsMobile(false);
    }, [router.asPath]);

    if (matches && isOpen) setIsOpen(false);
    const handleClick = () => {
        if (cartProductLists.length > 0) {
            router.push("/shipping");
        } else {
            router.push("/");
        }
    };

    const handleClickNavbar = (slug: string) => {
        if (!matches) {
            setIsOpen(!isOpen);
            setSelectedGender(slug);
        } else {
            setIsMobile(!isMobile);
        }
    };
    const handleClickMobile = (slug: string) => {
        setSelectedGender(slug);
    };

    if (!brandLists || !categoryLists || !genderLists) return <></>;

    return (
        <Box>
            <Box
                sx={{
                    backgroundColor: isOpen ? "white" : "inherit",
                    display: { xs: "none", md: "flex" },
                    justifyContent: "space-around",
                    position: "absolute",
                    top: 0,
                    padding: "30px 0px",
                    color: "black",
                    alignItems: "center",
                    width: "100%",
                    zIndex: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "32px",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            gap: "6px",
                            alignItems: "center",
                            fontFamily: theme.typography.h2.fontFamily,
                            fontWeight: "700",
                            fontSize: "16px",
                            letterSpacing: "0.085em",
                            textTransform: "uppercase",
                            color: "#212121",
                        }}
                        onClick={() => router.push("/")}
                    >
                        <Image
                            src={"/images/logo.png"}
                            alt={"Majestic"}
                            width={35}
                            height={25}
                        />
                        Majestic
                    </Box>
                    {genderLists.map(
                        (genderItem: genderType, index: number) => {
                            return (
                                <>
                                    <Box
                                        key={index}
                                        onClick={(e) =>
                                            handleClickNavbar(genderItem.slug)
                                        }
                                        sx={{
                                            cursor: "pointer",
                                            textDecoration:
                                                selectedGender ===
                                                genderItem.slug
                                                    ? "underline !important"
                                                    : "auto",
                                            fontFamily:
                                                theme.typography.h2.fontFamily,
                                            fontWeight: "700",
                                            fontSize: "16px",
                                            color: theme.palette.primary.main,
                                        }}
                                    >
                                        {genderItem.name}
                                    </Box>
                                </>
                            );
                        }
                    )}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "30px",
                        alignItems: "center",
                    }}
                >
                    <Image
                        src={"/images/Call.png"}
                        alt={"call"}
                        height={20}
                        width={20}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                        onClick={handleClick}
                    >
                        <Image
                            src={"/images/Cart.png"}
                            alt={"cart"}
                            height={20}
                            width={20}
                            style={{ position: "relative" }}
                        />
                        <Box
                            sx={{
                                position: "absolute",
                                top: "25%",
                                backgroundColor: "red",
                                left: "76%",
                                borderRadius: "41px",
                                width: "20px",
                                textAlign: "center",
                            }}
                        >
                            <Typography sx={{ color: "white" }}>
                                {totalItems}
                            </Typography>
                        </Box>
                    </Box>
                    <Image
                        src={"/images/Search.png"}
                        alt={"search"}
                        height={20}
                        width={20}
                    />
                    <Image
                        src={"/images/Login.png"}
                        alt={"login"}
                        height={20}
                        width={20}
                    />
                    <Image
                        src={"/images/Like.png"}
                        alt={"like"}
                        height={20}
                        width={20}
                    />
                </Box>
            </Box>

            {/* mobile */}
            <Box
                sx={{
                    backgroundColor: isOpen ? "white" : "inherit",
                    display: { md: "none", xs: "flex" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "30px 30px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: "6px",
                        alignItems: "center",
                        fontFamily: theme.typography.h2.fontFamily,
                        fontWeight: "700",
                        fontSize: "16px",
                        letterSpacing: "0.085em",
                        textTransform: "uppercase",
                        color: "#212121",
                    }}
                    onClick={() => router.push("/")}
                >
                    <Image
                        src={"/images/logo.png"}
                        alt={"Majestic"}
                        width={35}
                        height={25}
                    />
                    Majestic
                </Box>
                <Box>
                    <Image
                        src={"/images/menu.png"}
                        alt="menuicon"
                        height={30}
                        width={30}
                        onClick={() => handleClickNavbar("")}
                    />
                </Box>

                {isMobile ? (
                    <>
                        <Box
                            sx={{
                                display: "block",
                                marginTop: "30px",
                                flexDirection: "column",
                                gap: "21px",
                                position: "absolute",
                                top: "60px",
                                width: "100%",
                                right: "0",
                                backgroundColor: "white",
                                zIndex: 2,
                            }}
                        >
                            {genderLists.map(
                                (genderItem: genderType, index: number) => {
                                    return (
                                        <Accordion
                                            key={index}
                                            sx={{
                                                backgroundColor:
                                                    theme.palette.background
                                                        .default,
                                            }}
                                            onClick={() =>
                                                handleClickMobile(
                                                    genderItem.slug
                                                )
                                            }
                                        >
                                            <AccordionSummary
                                                sx={{
                                                    backgroundColor:
                                                        theme.palette.background
                                                            .default,
                                                }}
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>
                                                    {genderItem.name}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails
                                                sx={{
                                                    backgroundColor:
                                                        theme.palette.background
                                                            .default,
                                                }}
                                            >
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <ExpandMoreIcon />
                                                        }
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography>
                                                            Products
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                gap: "30px",
                                                            }}
                                                        >
                                                            {categoryLists.map(
                                                                (
                                                                    categoryItem: categoryType
                                                                ) => {
                                                                    return (
                                                                        <Link
                                                                            style={{
                                                                                color: theme
                                                                                    .palette
                                                                                    .primary
                                                                                    .dark,
                                                                                textDecoration:
                                                                                    "none",
                                                                                fontFamily:
                                                                                    theme
                                                                                        .typography
                                                                                        .h3
                                                                                        .fontFamily,
                                                                                fontWeight:
                                                                                    "400",
                                                                                fontSize:
                                                                                    "16px",
                                                                            }}
                                                                            key={
                                                                                categoryItem.id
                                                                            }
                                                                            href={`/${selectedGender}/products/category/${categoryItem.slug}`}
                                                                        >
                                                                            {
                                                                                categoryItem.name
                                                                            }
                                                                        </Link>
                                                                    );
                                                                }
                                                            )}
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <ExpandMoreIcon />
                                                        }
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography>
                                                            Designers
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                gap: "30px",
                                                            }}
                                                        >
                                                            {brandLists.map(
                                                                (
                                                                    brandItem: brandType
                                                                ) => {
                                                                    return (
                                                                        <Link
                                                                            style={{
                                                                                color: theme
                                                                                    .palette
                                                                                    .primary
                                                                                    .dark,
                                                                                textDecoration:
                                                                                    "none",
                                                                                fontFamily:
                                                                                    theme
                                                                                        .typography
                                                                                        .h3
                                                                                        .fontFamily,
                                                                                fontWeight:
                                                                                    "400",
                                                                                fontSize:
                                                                                    "16px",
                                                                            }}
                                                                            key={
                                                                                brandItem.id
                                                                            }
                                                                            href={`/${selectedGender}/products/brand/${brandItem.slug}`}
                                                                        >
                                                                            {
                                                                                brandItem.name
                                                                            }
                                                                        </Link>
                                                                    );
                                                                }
                                                            )}
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <ExpandMoreIcon />
                                                        }
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography>
                                                            Archived Collections
                                                        </Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                gap: "30px",
                                                            }}
                                                        >
                                                            {archivedCollectionsList.map(
                                                                (
                                                                    archivedItem
                                                                ) => {
                                                                    return (
                                                                        <Link
                                                                            style={{
                                                                                color: theme
                                                                                    .palette
                                                                                    .primary
                                                                                    .dark,
                                                                                textDecoration:
                                                                                    "none",
                                                                                fontFamily:
                                                                                    theme
                                                                                        .typography
                                                                                        .h3
                                                                                        .fontFamily,
                                                                                fontWeight:
                                                                                    "400",
                                                                                fontSize:
                                                                                    "16px",
                                                                            }}
                                                                            key={
                                                                                archivedItem.id
                                                                            }
                                                                            href={
                                                                                "/"
                                                                            }
                                                                        >
                                                                            {
                                                                                archivedItem.value
                                                                            }
                                                                        </Link>
                                                                    );
                                                                }
                                                            )}
                                                        </Box>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                }
                            )}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "30px",
                                    alignItems: "flex-start",
                                    padding: "15px 30px",
                                }}
                            >
                                <Image
                                    src={"/images/Call.png"}
                                    alt={"call"}
                                    height={20}
                                    width={20}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        position: "relative",
                                    }}
                                    onClick={handleClick}
                                >
                                    <Image
                                        src={"/images/Cart.png"}
                                        alt={"cart"}
                                        height={20}
                                        width={20}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: "-55%",
                                            backgroundColor: "red",
                                            left: "80%",
                                            borderRadius: "41px",
                                            width: "20px",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography sx={{ color: "white" }}>
                                            {cartProductLists
                                                ? cartProductLists.length
                                                : 0}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Image
                                    src={"/images/Search.png"}
                                    alt={"search"}
                                    height={20}
                                    width={20}
                                />
                                <Image
                                    src={"/images/Login.png"}
                                    alt={"login"}
                                    height={20}
                                    width={20}
                                />
                                <Image
                                    src={"/images/Like.png"}
                                    alt={"like"}
                                    height={20}
                                    width={20}
                                />
                            </Box>
                        </Box>
                    </>
                ) : (
                    <></>
                )}
            </Box>
            {isOpen ? (
                <Box
                    sx={{
                        backgroundColor: "white",
                        position: "absolute",
                        top: "85px",
                        textAlign: "left",
                        zIndex: 2,
                        color: "black",
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: {
                                md: "30px 140px",
                                xl: "30px 290px 180px 290px",
                            },
                            borderBottom: "1px solid white",
                            borderBottomLeftRadius: "40px",
                            borderBottomRightRadius: "40px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                gap: { md: "100px", xl: "150px" },
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "30px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily:
                                            theme.typography.h3.fontFamily,
                                        fontWeight: "400",
                                        fontSize: "24px",
                                        color: theme.palette.primary.light,
                                        marginBottom: "25px",
                                    }}
                                >
                                    Products
                                </Typography>
                                {categoryLists.map((category: categoryType) => {
                                    return (
                                        <Link
                                            style={{
                                                color: theme.palette.primary
                                                    .dark,
                                                textDecoration: "none",
                                                fontFamily:
                                                    theme.typography.h3
                                                        .fontFamily,
                                                fontWeight: "400",
                                                fontSize: "16px",
                                            }}
                                            key={category.id}
                                            href={`/${selectedGender}/products/category/${category.slug}`}
                                        >
                                            {category.name}
                                        </Link>
                                    );
                                })}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "30px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily:
                                            theme.typography.h3.fontFamily,
                                        fontWeight: "400",
                                        fontSize: "24px",
                                        color: theme.palette.primary.light,
                                        marginBottom: "25px",
                                    }}
                                >
                                    Designers
                                </Typography>
                                {brandLists.map((brandItem: brandType) => {
                                    return (
                                        <Link
                                            style={{
                                                color: theme.palette.primary
                                                    .dark,
                                                textDecoration: "none",
                                                fontFamily:
                                                    theme.typography.h3
                                                        .fontFamily,
                                                fontWeight: "400",
                                                fontSize: "16px",
                                            }}
                                            key={brandItem.id}
                                            href={`/${selectedGender}/products/brand/${brandItem.slug}`}
                                        >
                                            {brandItem.name}
                                        </Link>
                                    );
                                })}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "30px",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontFamily:
                                            theme.typography.h3.fontFamily,
                                        fontWeight: "400",
                                        fontSize: "24px",
                                        color: theme.palette.primary.light,
                                        marginBottom: "25px",
                                    }}
                                >
                                    Archived collections
                                </Typography>
                                {archivedCollectionsList.map((archivedItem) => {
                                    return (
                                        <Link
                                            style={{
                                                color: "#8E8E93",
                                                textDecoration: "none",
                                                fontFamily:
                                                    theme.typography.h3
                                                        .fontFamily,
                                                fontWeight: "400",
                                                fontSize: "16px",
                                            }}
                                            key={archivedItem.id}
                                            href={`/`}
                                        >
                                            {archivedItem.value}
                                        </Link>
                                    );
                                })}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                textAlign: "left",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "300px",
                                    height: "250px",
                                }}
                            >
                                <Image
                                    src={"/images/catgeorymenuimg.png"}
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
                                <Typography
                                    sx={{
                                        color: theme.palette.primary.light,
                                    }}
                                >
                                    Sales on ChanelAccessories
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <></>
            )}
        </Box>
    );
};

export default Navbar;
