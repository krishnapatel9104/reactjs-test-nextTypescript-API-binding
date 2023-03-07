import { Button, Typography, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Keyboard, Scrollbar, Pagination, Navigation } from "swiper";
import { productsType } from "../../types/constants/products.type";
import theme from "../../theme";
import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import baseURL from "../../api";
import axios from "axios";

export const BestSeller = () => {
    const router = useRouter();
    const [bestSellerProducts, setBestSellerProducts] =
        useState<productsType[]>();
    const [swiperCurrentIndex, setSwiperCurrentIndex] = useState<number>(0);

    const bestSellerPrevRef = useRef(null);
    const bestSellerNextRef = useRef(null);

    useEffect(() => {
        const callApi = async () => {
            await axios
                .get(`${baseURL}/product`, {
                    params: { type: "bestSeller" },
                })
                .then((response) => {
                    setBestSellerProducts(response.data.filterData);
                });
        };
        callApi();
    }, []);

    return (
        <Box
            sx={{
                marginTop: { xs: "30px", md: "100px" },
            }}
        >
            <Typography
                sx={{
                    fontFamily: theme.typography.h1.fontFamily,
                    fontWeight: "700",
                    fontSize: {
                        xl: "42px",
                        md: "39px",
                        sm: "28px",
                        xs: "22px",
                    },
                    color: theme.palette.primary.main,
                    textAlign: "center",
                    marginBottom: { xs: "30px", md: "100px" },
                }}
            >
                Best Seller
            </Typography>
            <Box
                sx={{
                    margin: {
                        xl: "0 130px",
                        lg: "0 100px",
                        md: "0 100px",
                        sm: "100px",
                        xs: "0 40px",
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: { sm: "50px", md: "60px", lg: "100px" },
                    "& .swiper-button-next, .swiper-button-prev": {
                        color: "#D1D1D6",
                    },
                }}
            >
                <Box
                    className="swiper-button image-swiper-button-prev"
                    sx={{
                        height: {
                            xs: "15px",
                            sm: "20px",
                            md: "20px",
                            lg: "30px",
                        },
                        width: {
                            xs: "50px",
                            sm: "30px",
                            md: "25px",
                            lg: "25px",
                        },
                        opacity: swiperCurrentIndex === 0 ? 0.2 : 1,
                        marginTop: "-90px",
                    }}
                    ref={bestSellerPrevRef}
                >
                    <Image
                        src={"/images/vectorLeft.png"}
                        alt="imageGirl"
                        height={0}
                        width={0}
                        sizes="(max-width:0) 100vw,
                    (max-height:0) 100vh"
                        style={{
                            objectFit: "contain",
                            height: "100%",
                            width: "100%",
                        }}
                    />
                </Box>
                <Swiper
                    onReachBeginning={(e) => setSwiperCurrentIndex(0)}
                    onReachEnd={(e) => setSwiperCurrentIndex(1)}
                    slidesPerView={4}
                    centeredSlides={false}
                    slidesPerGroupSkip={1}
                    grabCursor={true}
                    keyboard={{
                        enabled: true,
                    }}
                    navigation={{
                        prevEl: bestSellerPrevRef.current,
                        nextEl: bestSellerNextRef.current,
                        disabledClass: "swiper-button-disabled",
                    }}
                    breakpoints={{
                        1280: {
                            slidesPerView: 4,
                            slidesPerGroup: 1,
                        },
                        960: {
                            slidesPerView: 3,
                            slidesPerGroup: 1,
                        },
                        600: {
                            slidesPerView: 2,
                            slidesPerGroup: 1,
                        },
                        0: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                        },
                    }}
                    modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                    className="mySwiper"
                >
                    {bestSellerProducts !== undefined &&
                        bestSellerProducts?.length > 0 &&
                        bestSellerProducts.map((product) => {
                            return (
                                <Box key={product.id}>
                                    <SwiperSlide
                                        style={{
                                            fontSize: "18px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        onClick={() => {
                                            router.replace(
                                                {
                                                    pathname: `/product/${product.id}`,
                                                }
                                            );
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                marginLeft: "10px",
                                                gap: "50px",
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: {
                                                        xs: "150px",
                                                        lg: "200px",
                                                        xl: "300px",
                                                    },
                                                    height: {
                                                        xs: "150px",
                                                        lg: "200px",
                                                        xl: "300px",
                                                    },
                                                    gap: "30px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                >
                                                    <Image
                                                        src={
                                                            product
                                                                .productImages[0]
                                                        }
                                                        alt="imageGirl"
                                                        height={0}
                                                        width={0}
                                                        sizes="(max-width:0) 100vw,
                                                                (max-height:0) 100vh"
                                                        style={{
                                                            objectFit:
                                                                "contain",
                                                            height: "100%",
                                                            width: "100%",
                                                        }}
                                                    />
                                                </Box>
                                            </Box>
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        fontFamily:
                                                            theme.typography.h1
                                                                .fontFamily,
                                                        fontWeight: "700",
                                                        fontSize: {
                                                            lg: "22px",
                                                            md: "20px",
                                                            xs: "18px",
                                                        },
                                                        color: theme.palette
                                                            .primary.main,
                                                    }}
                                                >
                                                    {product.productName}
                                                </Typography>
                                                <Typography>
                                                    <span
                                                        style={{
                                                            fontFamily:
                                                                theme.typography
                                                                    .h1
                                                                    .fontFamily,
                                                            fontWeight: "400",
                                                            fontSize: "20px",
                                                            textDecorationLine:
                                                                "line-through",
                                                            color: theme.palette
                                                                .secondary
                                                                .light,
                                                        }}
                                                    >
                                                        $
                                                        {
                                                            product.productOriginalPrice
                                                        }
                                                    </span>
                                                    &nbsp;&nbsp;
                                                    <span
                                                        className="currentprice"
                                                        style={{
                                                            fontFamily:
                                                                theme.typography
                                                                    .h1
                                                                    .fontFamily,
                                                            fontWeight: "400",
                                                            fontSize: "20px",
                                                            color: theme.palette
                                                                .secondary.dark,
                                                        }}
                                                    >
                                                        $
                                                        {
                                                            product.productCurrentPrice
                                                        }
                                                    </span>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </SwiperSlide>
                                </Box>
                            );
                        })}
                </Swiper>
                <Box
                    className="swiper-button image-swiper-button-next"
                    sx={{
                        height: {
                            xs: "15px",
                            sm: "20px",
                            md: "20px",
                            lg: "30px",
                        },
                        width: {
                            xs: "50px",
                            sm: "30px",
                            md: "25px",
                            lg: "25px",
                        },
                        opacity: swiperCurrentIndex === 1 ? 0.2 : 1,
                        marginTop: "-90px",
                    }}
                    ref={bestSellerNextRef}
                >
                    <Image
                        src={"/images/vectorRight.png"}
                        alt="imageGirl"
                        height={0}
                        width={0}
                        sizes="(max-width:0) 100vw,
                    (max-height:0) 100vh"
                        style={{
                            objectFit: "contain",
                            height: "100%",
                            width: "100%",
                        }}
                    />
                </Box>
            </Box>
            <Box sx={{ textAlign: "center" }}>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: { xs: "50px", sm: "0", md: "100px" },
                        marginBottom: { xs: "0", md: "70px" },
                        padding: { xs: "5px 20px", sm: "10px 40px" },
                        background: "#212121",
                        fontFamily: theme.typography.h1.fontFamily,
                        fontWeight: "700",
                        fontSize: { xs: "10px", sm: "20px" },
                        color: "#FFFFFF",
                    }}
                    onClick={() =>
                        router.push(`women/products/category/clothes`)
                    }
                >
                    View All
                </Button>
            </Box>
        </Box>
    );
};
