import { Box, Grid, Pagination, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { productsType } from "../../types/constants/products.type";

interface ProductCatelogProps {
    count: number;
    handleChangePagination: (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => void;
    page: number;
    filterCategoryData: productsType[];
    handleProductClick: (productDetail: productsType) => void;
    totalCount: number;
}
const ProductCatelog: React.FC<ProductCatelogProps> = ({
    count,
    handleChangePagination,
    page,
    filterCategoryData,
    handleProductClick,
    totalCount,
}) => {
    return (
        <>
            <Box
                sx={{
                    width: "70%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginBottom: "15px",
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: "Jost",
                            fontWeight: "700",
                            fontSize: {
                                lg: "50px",
                                md: "32px",
                                xs: "25px",
                            },
                            textAlign: "center",
                            color: "#212121",
                        }}
                    >
                        Women Party Dresses
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: "Jost",
                            fontWeight: "400",
                            fontSize: "20px",
                            letterSpacing: "0.02em",
                            color: "#4B5563",
                        }}
                    >
                        {totalCount}&nbsp;results
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: "100%",
                        objectFit: "contain",
                    }}
                >
                    <Grid container columnSpacing={5}>
                        {filterCategoryData?.length > 0 ? (
                            filterCategoryData.map((product) => {
                                return (
                                    <Grid
                                        item
                                        key={product.id}
                                        sm={6}
                                        lg={4}
                                        sx={{
                                            position: "relative",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                height: "300px",
                                                width: "inherit",
                                                position: "relative",
                                            }}
                                        >
                                            <Image
                                                src={product.productImages[0]}
                                                alt="imageGirl"
                                                height={0}
                                                width={0}
                                                sizes="(max-width:0) 100vw
                                                                (max-height:0) 100vh"
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    objectFit: "cover",
                                                    objectPosition: "top",
                                                }}
                                                onClick={(e) =>
                                                    handleProductClick(product)
                                                }
                                            />
                                            <Box
                                                sx={{
                                                    background:
                                                        "rgba(0, 0, 0, 0.3)",
                                                    width: "fit-content",
                                                    padding: "5px 8px",
                                                    position: "absolute",
                                                    paddingTop: "10px",
                                                    top: "8%",
                                                    right: 0,
                                                }}
                                            >
                                                <Image
                                                    src={
                                                        "/images/whitelike.png"
                                                    }
                                                    alt="productimg"
                                                    width={25}
                                                    height={22}
                                                />
                                            </Box>
                                            {product.type === 1 && (
                                                <Box
                                                    sx={{
                                                        backgroundColor:
                                                            "#111827",
                                                        width: "fit-content",
                                                        padding: "2px 10px",
                                                        position: "absolute",
                                                        top: "0",
                                                    }}
                                                >
                                                    <Typography
                                                        sx={{
                                                            fontFamily: "Jost",
                                                            fontWeight: "400",
                                                            fontSize: "12px",
                                                            color: "#FFFFFF",
                                                        }}
                                                    >
                                                        New Arrivals
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginTop: "10px",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <Box>
                                                <Typography
                                                    sx={{
                                                        width: "80%",
                                                        fontFamily: "Inter",
                                                        fontWeight: "400",
                                                        fontSize: "18px",
                                                        color: "#000000",
                                                    }}
                                                >
                                                    {product.productName}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <Image
                                                    src={
                                                        "/images/womenproductcart.png"
                                                    }
                                                    alt="productimg"
                                                    height={22}
                                                    width={32}
                                                />
                                            </Box>
                                        </Box>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    width: "80%",
                                                    fontFamily: "Inter",
                                                    fontWeight: "400",
                                                    fontSize: "20px",
                                                    color: "#1B2437",
                                                    alignItems: "flex-start",
                                                }}
                                            >
                                                $ {product.productCurrentPrice}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                );
                            })
                        ) : (
                            <Image
                                src="/images/data-not-found.jpg"
                                alt="data not found"
                                height={300}
                                width={300}
                                style={{ marginLeft: "50px" }}
                            />
                        )}
                    </Grid>
                    {filterCategoryData.length > 0 ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: "70px",
                                marginBottom: "70px",
                                "& .MuiButtonBase-root": {
                                    backgroundColor: "#D1D5DB",
                                },
                                "& .MuiPagination-ul> li:first-child > button":
                                    {
                                        backgroundColor: "#D1D5DB",
                                    },
                                "& .MuiPagination-ul>li:last-child > button": {
                                    backgroundColor: "#1F2937",
                                    color: "white",
                                },
                            }}
                        >
                            <Pagination
                                count={count}
                                variant="outlined"
                                shape="rounded"
                                page={page}
                                onChange={(event, page) =>
                                    handleChangePagination(event, page)
                                }
                            />
                        </Box>
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default ProductCatelog;
