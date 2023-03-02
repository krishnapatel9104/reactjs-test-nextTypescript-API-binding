import React, { useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperCore, {
    Navigation,
    Scrollbar,
    Pagination,
    Mousewheel,
    Keyboard,
} from "swiper";
import { productsType } from "../../types/constants/products.type";
interface SwiperSlideProps {
    productDetail: productsType;
}
const SwiperSlider: React.FC<SwiperSlideProps> = ({ productDetail }) => {
    const [selectedImage, setSelectedImage] = useState<number>();
    const [firstCurrentIndex, setFirstCurrentIndex] = useState<number>(0);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [swiper, setSwiper] = useState<SwiperCore>();
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const firstPrevRef = useRef(null);
    const firstNextRef = useRef(null);

    const changeProductImage = (item: number) => {
        setSelectedImage(item);
    };

    const onBeforeInit = (Swiper: SwiperCore): void => {
        if (typeof Swiper.params.navigation !== "boolean") {
            const navigation = Swiper.params.navigation;
            if (navigation) {
                navigation.prevEl = firstPrevRef.current;
                navigation.nextEl = firstNextRef.current;
            }
        }
    };
    const onBeforeInitSecond = (Swiper: SwiperCore): void => {
        if (typeof Swiper.params.navigation !== "boolean") {
            const navigation = Swiper.params.navigation;
            if (navigation) {
                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
            }
        }
    };

    useEffect(() => {
        if (swiper !== undefined && selectedImage !== undefined)
            swiper?.slideTo(selectedImage);
    }, [selectedImage, swiper]);
    return (
        <Box
            sx={{
                width: { xs: "100%", md: "45%" },
                textAlign: "center",
                "& .swiper-button-next, .swiper-button-prev": {
                    color: "#D1D1D6",
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: {
                        xs: "30px",
                        sm: "180px",
                        md: "60px",
                        lg: "60px",
                        xl: "100px",
                    },
                }}
            >
                <Box
                    className="swiper-button image-swiper-button-prev"
                    ref={firstPrevRef}
                    sx={{
                        opacity: firstCurrentIndex === 0 ? 0.2 : 1,
                    }}
                >
                    <Image
                        src={"/images/vectorLeft.png"}
                        alt="left"
                        height={20}
                        width={15}
                    />
                </Box>
                <Swiper
                    onSwiper={(swiper) => setSwiper(swiper)}
                    onSlideChange={(state) =>
                        setFirstCurrentIndex(state.activeIndex)
                    }
                    slidesPerView={1}
                    spaceBetween={30}
                    centeredSlides={false}
                    slidesPerGroupSkip={1}
                    cssMode={true}
                    navigation={{
                        prevEl: firstPrevRef.current,
                        nextEl: firstNextRef.current,
                        disabledClass: "swiper-button-disabled",
                    }}
                    onInit={onBeforeInit}
                    pagination={false}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                >
                    {productDetail &&
                        productDetail?.productImages &&
                        productDetail.productImages.map((item, index) => {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        height: {
                                            xs: "450px",
                                            md: "550px",
                                        },
                                        width: {
                                            xs: "250px",
                                            md: "500px",
                                        },
                                    }}
                                >
                                    <SwiperSlide>
                                        <Image
                                            src={item}
                                            alt="imageGirl"
                                            height={0}
                                            width={0}
                                            sizes="(max-width:0) 100vw,
                                (max-height:0) 100vh"
                                            style={{
                                                objectFit: "contain",
                                                height: "80%",
                                                width: "80%",
                                            }}
                                        />
                                    </SwiperSlide>
                                </Box>
                            );
                        })}
                </Swiper>
                <Box
                    className="swiper-button image-swiper-button-next"
                    ref={firstNextRef}
                    sx={{
                        opacity:
                            firstCurrentIndex ===
                            productDetail?.productImages?.length - 1
                                ? 0.2
                                : 1,
                    }}
                >
                    <Image
                        src={"/images/vectorRight.png"}
                        alt="left"
                        height={20}
                        width={15}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    marginTop: "50px",
                    "& .swiper-button-next, .swiper-button-prev": {
                        color: "#D1D1D6",
                    },
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "50px",
                    "& .swiper-slide:first-child": {
                        marginLeft: "10px",
                    },
                }}
            >
                <Box
                    className="swiper-button image-swiper-button-prev"
                    ref={prevRef}
                    sx={{
                        opacity: currentIndex === 0 ? 0.2 : 1,
                    }}
                >
                    <Image
                        src={"/images/vectorLeft.png"}
                        alt="left"
                        height={20}
                        width={15}
                    />
                </Box>
                <Swiper
                    onSlideChange={(state) =>
                        setCurrentIndex(state.activeIndex)
                    }
                    slidesPerView={5}
                    spaceBetween={30}
                    slidesPerGroupSkip={1}
                    grabCursor={true}
                    keyboard={{
                        enabled: true,
                    }}
                    breakpoints={{
                        1500: {
                            slidesPerView: 5,
                            slidesPerGroup: 1,
                        },
                        1280: {
                            slidesPerView: 4,
                            slidesPerGroup: 1,
                        },
                        900: {
                            slidesPerView: 4,
                            slidesPerGroup: 1,
                        },
                        600: {
                            slidesPerView: 5,
                            slidesPerGroup: 1,
                        },
                        500: {
                            slidesPerView: 4,
                            slidesPerGroup: 1,
                        },
                        400: {
                            slidesPerView: 3,
                            slidesPerGroup: 1,
                        },
                        380: {
                            slidesPerView: 2,
                            slidesPerGroup: 1,
                        },
                        300: {
                            slidesPerView: 2,
                            slidesPerGroup: 1,
                        },
                        0: {
                            slidesPerView: 1,
                            slidesPerGroup: 1,
                        },
                    }}
                    scrollbar={false}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                        disabledClass: "swiper-button-disabled",
                    }}
                    onInit={onBeforeInitSecond}
                    pagination={false}
                    modules={[Keyboard, Scrollbar, Navigation, Pagination]}
                >
                    {productDetail &&
                        productDetail?.productImages &&
                        productDetail.productImages.map((item, index) => {
                            return (
                                <Box key={index}>
                                    <SwiperSlide
                                        style={{
                                            marginTop: "50px",
                                            textAlign: "center",
                                            fontSize: "18px",
                                            background: "#fff",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Image
                                            src={item}
                                            alt="likeicon"
                                            style={{
                                                display: "block",
                                                objectFit: "contain",
                                            }}
                                            height={130}
                                            width={100}
                                            onClick={(e) =>
                                                changeProductImage(index)
                                            }
                                        />
                                    </SwiperSlide>
                                </Box>
                            );
                        })}
                </Swiper>
                <Box
                    className="swiper-button image-swiper-button-next"
                    ref={nextRef}
                    sx={{
                        opacity: currentIndex === 1 ? 0.2 : 1,
                    }}
                >
                    <Image
                        src={"/images/vectorRight.png"}
                        alt="left"
                        height={20}
                        width={15}
                    />
                </Box>
            </Box>
        </Box>
    );
};
export default SwiperSlider;
