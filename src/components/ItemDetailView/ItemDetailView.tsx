import { Box, Button, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { setUserSelectedProductList } from "../../store/reducers/userSelectedProductList/userSelectedProductList.slice";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import { productsType } from "../../types/constants/products.type";
import { sizeLists } from "../../data/sizeLists";
import { colorLists } from "../../data/colorLists";
import { useSelector, useDispatch } from "../../store/index";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import SwiperSlider from "./SwiperSlider";
import { addProductToCart } from "../../store/reducers/productDetailsLists/productLists.api";

interface itemDetailViewProps {
    product: productsType;
}
const ItemDetailView: FC<itemDetailViewProps> = ({ product }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState<productsType>(product);
    const [selectedSize, setSelectedSize] = useState<number>(
        productDetail?.size && productDetail?.size[0]
    );
    const [selectedColor, setSelectedColor] = useState<number>(
        productDetail?.color && productDetail?.color[0]
    );
    const [value, setValue] = useState<string>("1");
    const userCartProductDetails = useSelector(
        (state) => state.userSelectedProductListSlice
    );

    const cartProductLists = useSelector((state) => state.productListsSlice);
    console.log("AAAAAAAAAAA cartProductLists :: ", cartProductLists);

    useEffect(() => {
        if (userCartProductDetails?.cartProductDetails?.length !== 0) {
            localStorage.setItem(
                "userSelectedProductList",
                JSON.stringify(userCartProductDetails.cartProductDetails)
            );
        }
    }, [userCartProductDetails.cartProductDetails]);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const changeHandler = (type: string, value: number | undefined) => {
        if (type === "color" && value) setSelectedColor(value);
        else if (type === "size" && value) setSelectedSize(value);
    };

    const productObjectDetail = () => {
        let addProductToCartObject = {
            productId: productDetail?.id,
            quantity: 1,
            size: selectedSize,
            color: selectedColor,
            userId: 1,
        };
        return addProductToCartObject;
    };

    const handleShopNow = () => {
        let object = productObjectDetail();
        dispatch(setUserSelectedProductList(object));
        router.push("/shipping");
    };

    const handleAddToCart = () => {
        let object = productObjectDetail();
        // dispatch(setUserSelectedProductList(object));
        dispatch(addProductToCart(object));
    };

    return (
        <ProtectedRoute>
            <Box
                sx={{
                    marginTop: { xs: "0", md: "150px" },
                }}
            >
                <Navbar />
                <Box
                    sx={{
                        padding: {
                            lg: "0 145px",
                            md: "0 5px",
                            xs: "0 25px",
                        },
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "center",

                        display: "flex",
                        gap: "60px",
                    }}
                >
                    {/* left box */}
                    <SwiperSlider productDetail={productDetail} />
                    {/* right side */}
                    <Box
                        sx={{
                            width: { xs: "100%", md: "40%" },
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Box>
                                <Button
                                    variant="contained"
                                    sx={{
                                        fontFamily: "Inter",
                                        fontWeight: 700,
                                        fontSize: "14px",
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "center",
                                        color: "#1B2437",
                                        backgroundColor: "#E5E5EA",
                                    }}
                                >
                                    Popular
                                </Button>
                            </Box>
                            <Box>
                                <Image
                                    src={"/images/Like.png"}
                                    alt="likeicon"
                                    height={40}
                                    width={35}
                                    style={{
                                        padding: "6px",
                                        paddingTop: "10px",
                                        border: "1px solid #E5E5EA",
                                        borderRadius: "26px",
                                        backgroundColor: "#E5E5EA",
                                    }}
                                />
                            </Box>
                        </Box>
                        <Typography
                            sx={{
                                fontSize: {
                                    lg: "44px",
                                    sm: "35px",
                                    xs: "26px",
                                },
                                fontFamily: "Inter",
                                fontWeight: "400",
                                color: "#1B2437",
                            }}
                        >
                            {productDetail.productName}
                        </Typography>
                        <Box
                            sx={{
                                flexDirection: { xs: "column", lg: "row" },
                                alignItems: { xs: "flex-start", lg: "center" },
                                display: "flex",
                                gap: "20px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >
                                {productDetail?.reviewRate &&
                                    Array.from(
                                        Array(productDetail.reviewRate),
                                        (e, index) => {
                                            return (
                                                <Image
                                                    src={"/images/star.png"}
                                                    alt="likeicon"
                                                    key={index}
                                                    width={30}
                                                    height={30}
                                                />
                                            );
                                        }
                                    )}
                                {productDetail?.reviewRate &&
                                    Array.from(
                                        Array(5 - productDetail.reviewRate),
                                        (e, index) => {
                                            return (
                                                <Image
                                                    src={"/images/graystar.png"}
                                                    alt="likeicon"
                                                    key={index}
                                                    width={30}
                                                    height={30}
                                                />
                                            );
                                        }
                                    )}
                            </Box>
                            <Box>{productDetail?.reviewRate} reviews</Box>
                        </Box>
                        <Box sx={{ width: "100%", typography: "body1" }}>
                            <TabContext value={value}>
                                <Box
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: "divider",
                                    }}
                                >
                                    <TabList
                                        onChange={() => handleChange(value)}
                                        aria-label="lab API tabs example"
                                    >
                                        <Tab label="Info" value="1" />
                                        <Tab label="Brand" value="2" />
                                        <Tab label="Delivery" value="3" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    <Typography
                                        sx={{
                                            fontFamily: "Inter",
                                            fontWeight: "400",
                                            fontSize: "16px",
                                            color: "#8E8E93",
                                        }}
                                    >
                                        Dress with tulle and collar Peter Pan
                                        from REDValentino (Red Valentino). Peter
                                        Pan collar, tulle panels, sleeveless
                                        model, concealed back zipper and pleated
                                        skirt. Black colour.
                                    </Typography>
                                </TabPanel>
                                <TabPanel value="2">Item Two</TabPanel>
                                <TabPanel value="3">Item Three</TabPanel>
                            </TabContext>
                        </Box>
                        <Box
                            sx={{
                                flexDirection: {
                                    xs: "column",
                                    md: "column",
                                    sm: "row",
                                    lg: "row",
                                },
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "50px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Box
                                    sx={{
                                        gap: { xs: "110px" },
                                        display: "flex",
                                    }}
                                >
                                    <Typography>Size</Typography>
                                    <Typography
                                        sx={{
                                            color: "#111827",
                                            fontWeight: 700,
                                        }}
                                    >
                                        Size Guide
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        gap: { xs: "20px" },
                                        marginTop: { xs: "25px", lg: "50px" },
                                        display: "flex",
                                    }}
                                >
                                    {product?.size &&
                                        product.size.length > 0 &&
                                        product.size.map((size, index) => {
                                            let sizeDetail = sizeLists.find(
                                                (s) => s.id === size
                                            );
                                            return (
                                                <Button
                                                    key={index}
                                                    sx={{
                                                        color:
                                                            selectedSize ===
                                                            size
                                                                ? "white"
                                                                : "black",
                                                        width: "fit-content",
                                                        border: "1px solid #000000",
                                                        padding: "10px 20px",
                                                        backgroundColor:
                                                            selectedSize ===
                                                            size
                                                                ? "#1B2437 !important"
                                                                : "white",
                                                    }}
                                                    onClick={(e) =>
                                                        changeHandler(
                                                            "size",
                                                            sizeDetail?.id
                                                        )
                                                    }
                                                >
                                                    {sizeDetail?.value}
                                                </Button>
                                            );
                                        })}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    gap: { lg: "45px", xs: "20px" },
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography>Color</Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "20px",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: "20px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        {product?.color &&
                                            product.color.length > 0 &&
                                            product.color.map(
                                                (color, index) => {
                                                    let colorDetail =
                                                        colorLists.find(
                                                            (c) =>
                                                                c.id === color
                                                        );
                                                    return (
                                                        <Button
                                                            key={index}
                                                            sx={{
                                                                border:
                                                                    selectedColor ===
                                                                    color
                                                                        ? "1px solid red"
                                                                        : "1px solid white",
                                                                borderWidth:
                                                                    selectedColor ===
                                                                    color
                                                                        ? "3px"
                                                                        : "0",
                                                                width: "fit-content",
                                                                outlineColor:
                                                                    selectedColor ===
                                                                    color
                                                                        ? "1px solid red"
                                                                        : "1px solid black",
                                                                padding: "20px",
                                                                backgroundColor:
                                                                    colorDetail?.haxValue,
                                                                "&:hover": {
                                                                    backgroundColor:
                                                                        colorDetail?.haxValue,
                                                                },
                                                            }}
                                                            onClick={(e) =>
                                                                changeHandler(
                                                                    "color",
                                                                    colorDetail?.id
                                                                )
                                                            }
                                                        ></Button>
                                                    );
                                                }
                                            )}
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontSize: "34px",
                                color: "#1B2437",
                                marginTop: "20px",
                            }}
                        >
                            $ {productDetail.productCurrentPrice}
                        </Typography>
                        <Box
                            sx={{
                                flexDirection: { xs: "column", sm: "row" },
                                gap: { xs: "25px", sm: "50px" },
                                display: "flex",
                                marginTop: "25px",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={handleShopNow}
                                sx={{
                                    background: "#1B2437",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    padding: "15px 20px",
                                    textTransform: "inherit",
                                }}
                            >
                                Shop Now
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    background: "#F5F5F5",
                                    color: "black",
                                    fontWeight: "700",
                                    fontSize: "20px",
                                    padding: "15px 20px",
                                    textTransform: "inherit",
                                }}
                                onClick={handleAddToCart}
                            >
                                Add to cart
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ProtectedRoute>
    );
};
export default ItemDetailView;
