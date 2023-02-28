import React, { useState, useRef, useEffect } from "react";
import { Button, Typography, Box, Link } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import SwiperCore, {
    Keyboard,
    Scrollbar,
    Pagination,
    Navigation,
} from "swiper";
// import { productLists } from '../../data/productLists';
// import { genderLists } from '../../data/genderLists';
// import { categoryLists } from '../../data/categoryLists';
import theme from "../../theme";
import { useRouter } from "next/router";
import Image from "next/image";
import { productsType } from "../../types/constants/products.type";
import axios from "axios";
import baseURL from "../../api";
import { genderType } from "../../types/constants/gender.type";
import { categoryType } from "../../types/constants/category.type";

export const ShopByCategory = () => {
    const router = useRouter();
    const [filterProductLists, setFilterProductLists] = useState<
        productsType[]
    >([]);
    const [genderLists, setGenderLists] = useState<genderType[]>();
    const [categoryLists, setCategoryLists] = useState<categoryType[]>();

    const [selectedGender, setSelectedGender] = useState<number>();
    const [selectedCategory, setSelectedCategory] = useState<number>();
    const [swiperCurrentIndex, setSwiperCurrentIndex] = useState<number>(0);

    const shopByCategoryPrevRef = useRef(null);
    const shopByCategoryNextRef = useRef(null);

    const onBeforeInit = (Swiper: SwiperCore): void => {
        if (typeof Swiper.params.navigation !== "boolean") {
            const navigation = Swiper.params.navigation;
            if (navigation) {
                navigation.prevEl = shopByCategoryPrevRef.current;
                navigation.nextEl = shopByCategoryNextRef.current;
            }
        }
    };

    useEffect(() => {
        const callApi = async () => {
            await axios.get(`${baseURL}/gender`).then((response) => {
                console.log("gender list : ", response.data);
                setGenderLists(response.data);
            });
            await axios.get(`${baseURL}/category`).then((response) => {
                console.log("category list : ", response.data);
                setCategoryLists(response.data);
            });
        };
        callApi();
    }, []);

    useEffect(() => {
        if (genderLists && categoryLists) {
            setSelectedGender(genderLists[0].id);
            setSelectedCategory(categoryLists[0].id);
        }
    }, [genderLists, categoryLists]);

    useEffect(() => {
        const apis = async () => {
            await axios
                .get(`${baseURL}/product`, {
                    params: {
                        gender: selectedGender,
                        category: selectedCategory,
                    },
                })
                .then((response) => {
                    setFilterProductLists(response.data.filterData);
                });
        };
        apis();
    }, [selectedGender, selectedCategory]);

    if (!filterProductLists || !genderLists || !categoryLists) return <></>;

    console.log("filter data array ::::::::: ", filterProductLists);

    return (
        <Box>
            <Typography
                sx={{
                    marginBottom: "50px",
                    fontFamily: theme.typography.h1.fontFamily,
                    fontWeight: "700",
                    fontSize: {
                        xl: "42px",
                        md: "39px",
                        sm: "28px",
                        xs: "22px",
                    },
                    color: theme.palette.primary.main,
                    marginTop: { xs: "40px", sm: "20px" },
                    textAlign: "center",
                }}
            >
                Shop By Category
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "30px",
                    marginBottom: "40px",
                }}
            >
                {genderLists.map((gender, index) => {
                    if (index === 0 || index === 2) {
                        return (
                            <Link
                                key={index}
                                sx={{
                                    textDecoration: "none",
                                    fontFamily: theme.typography.h1.fontFamily,
                                    fontWeight: "400",
                                    fontSize: "25px",
                                    color:
                                        selectedGender === gender.id
                                            ? theme.palette.primary.main
                                            : "#757575",
                                    borderBottom:
                                        selectedGender === gender.id
                                            ? "1px solid #757575"
                                            : "none", //foractive
                                }}
                                onClick={() => {
                                    setSelectedGender(gender.id);
                                    setSwiperCurrentIndex(0);
                                }}
                            >
                                For {gender.name}
                            </Link>
                        );
                    }
                })}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                    marginBottom: "40px",
                    justifyContent: { xs: "space-between", sm: "center" },
                    paddingBottom: { xs: "7px", sm: "0" },
                    overflow: { xs: "scroll", md: "hidden" },
                }}
            >
                {categoryLists.map((categoryObj) => {
                    return (
                        <Link
                            key={categoryObj.id}
                            sx={{
                                fontFamily: theme.typography.h1.fontFamily,
                                fontWeight: "400",
                                fontSize: "20px",
                                textDecoration: "none",
                                color: "#000000",
                                padding:
                                    categoryObj.id === selectedCategory
                                        ? {
                                              xs: "7px 10px",
                                              sm: "14px 24px",
                                          }
                                        : 0,
                                background:
                                    selectedCategory === categoryObj.id
                                        ? "#E0E0E0"
                                        : theme.palette.background.default,
                            }}
                            onClick={(e) => {
                                setSelectedCategory(categoryObj.id);
                                setSwiperCurrentIndex(0);
                            }}
                        >
                            {categoryObj.name}
                        </Link>
                    );
                })}
            </Box>

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
                {filterProductLists.length > 3 && (
                    <>
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
                            ref={shopByCategoryPrevRef}
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
                            onBeforeInit={onBeforeInit}
                            navigation={{
                                prevEl: shopByCategoryPrevRef.current,
                                nextEl: shopByCategoryNextRef.current,
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
                            modules={[
                                Keyboard,
                                Scrollbar,
                                Navigation,
                                Pagination,
                            ]}
                            className="mySwiper"
                        >
                            {filterProductLists.length > 0 ? (
                                filterProductLists.map((product) => {
                                    let gender = genderLists.find(
                                        (gender) => gender.id === selectedGender
                                    );
                                    let category = categoryLists.find(
                                        (category) =>
                                            category.id === selectedCategory
                                    );
                                    // if (
                                    //     product.category === selectedCategory &&
                                    //     product.gender === selectedGender
                                    // ) {
                                    return (
                                        <Box key={product.id}>
                                            <SwiperSlide
                                                style={{
                                                    fontSize: "18px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                                onClick={() =>
                                                    router.push(
                                                        `${gender?.slug}/products/category/${category?.slug}`
                                                    )
                                                }
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
                                                                lg: "170px",
                                                                xl: "300px",
                                                            },
                                                            height: {
                                                                xs: "150px",
                                                                lg: "170px",
                                                                xl: "300px",
                                                            },
                                                            gap: "30px",
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
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
                                                    <Box>
                                                        <Typography
                                                            sx={{
                                                                fontFamily:
                                                                    theme
                                                                        .typography
                                                                        .h2
                                                                        .fontFamily,
                                                                fontWeight:
                                                                    "700",
                                                                fontSize: {
                                                                    lg: "22px",
                                                                    md: "20px",
                                                                    xs: "18px",
                                                                },
                                                                color: theme
                                                                    .palette
                                                                    .primary
                                                                    .main,
                                                            }}
                                                        >
                                                            {
                                                                product.productName
                                                            }
                                                        </Typography>
                                                        <Typography>
                                                            <span
                                                                style={{
                                                                    fontFamily:
                                                                        theme
                                                                            .typography
                                                                            .h2
                                                                            .fontFamily,
                                                                    fontWeight:
                                                                        "400",
                                                                    fontSize:
                                                                        "20px",
                                                                    textDecorationLine:
                                                                        "line-through",
                                                                    color: theme
                                                                        .palette
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
                                                                        theme
                                                                            .typography
                                                                            .h2
                                                                            .fontFamily,
                                                                    fontWeight:
                                                                        "400",
                                                                    fontSize:
                                                                        "20px",
                                                                    color: theme
                                                                        .palette
                                                                        .secondary
                                                                        .dark,
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
                                    // }
                                })
                            ) : (
                                <></>
                            )}
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
                            ref={shopByCategoryNextRef}
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
                    </>
                )}
            </Box>
            {filterProductLists.length < 4 && (
                <Typography
                    sx={{
                        fontSize: "22px",
                        fontWeight: "700",
                        textAlign: "center",
                        marginTop: "0px",
                    }}
                >
                    No Product Match
                </Typography>
            )}
            <Box sx={{ textAlign: "center" }}>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: { xs: "50px", sm: "0", md: "100px" },
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
