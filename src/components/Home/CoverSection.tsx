import { Box } from "@mui/material";
import React from "react";

export const CoverSection = () => {
    return (
        <Box
            sx={{
                height: {
                    xs: "350px",
                    sm: "370px",
                    md: "550px",
                    lg: "600px",
                    xl: "700px",
                },
                width: "100%",
                position: "relative",
                backgroundImage: `url("/images/headerback.png")`,
                objectFit: "cover",
                opacity: 0.2,
            }}
        ></Box>
    );
};
