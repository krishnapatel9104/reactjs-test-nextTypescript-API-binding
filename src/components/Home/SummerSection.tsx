import { Box, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import { summerSectionImageList } from "../../data/summerSectionImageList";
export const SummerSection = () => {
    return (
        <Box
            sx={{
                marginTop: "50px",
                padding: {
                    xs: "0px 30px",
                    sm: "50px 65px",
                    lg: "50px 250px",
                },
            }}
        >
            <Grid container>
                <Grid item sm={6} xs={12}>
                    <Image
                        src="/images/maincard.png"
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
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Grid container>
                        {summerSectionImageList.map((product) => {
                            return (
                                <Grid item sm={6} xs={6} key={product.id}>
                                    <Image
                                        src={product.productImage}
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
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};
