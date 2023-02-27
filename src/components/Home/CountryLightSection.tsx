import { Box, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import { CountryLightImagesList } from "../../data/countryLightSectionList";

export const CountryLightSection = () => {
    return (
        <Box
            sx={{
                marginTop: { xs: "100px" },
                padding: {
                    xs: "0px 30px",
                    sm: "50px 65px",
                    lg: "50px 250px",
                },
            }}
        >
            <Grid container>
                {CountryLightImagesList.map((product) => {
                    return (
                        <Grid
                            key={product.id}
                            item
                            sm={6}
                            xs={6}
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                            }}
                        >
                            <Image
                                src={product.productImage}
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
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};
