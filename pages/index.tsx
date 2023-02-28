import React from "react";
import { ProtectedRoute } from "../src/utils/ProtectedRoute";
import theme from "../src/theme";
import { Box } from "@mui/material";
import { Header } from "../src/components/Home/Header";
import { BestDeal } from "../src/components/Home/BestDeal";
import { BeExclusive } from "../src/components/Home/BeExclusive";
import { CheckoutNewArrivals } from "../src/components/Home/CheckoutNewArrivals";
import { ShopByCategory } from "../src/components/Home/ShopByCategory";
import { CountryLightSection } from "../src/components/Home/CountryLightSection";
import { BestSeller } from "../src/components/Home/BestSeller";
import { SummerSection } from "../src/components/Home/SummerSection";
import { GentleFormalLookSection } from "../src/components/Home/GentleFormalLookSection";
import { CardFooterSection } from "../src/components/Home/CardFooterSection";
import { FooterSliderSection } from "../src/components/Home/FooterSliderSection";
import { Footer } from "../src/components/Home/Footer";
import Navbar from "../src/components/Navbar/Navbar";
import { NextPage } from "next";

interface IndexPageProps { }
const Index: NextPage<IndexPageProps> = () => {
    return (
        <ProtectedRoute>
            <Box sx={{ backgroundColor: theme.palette?.background.default }}>
                <Navbar />
                <Header />
                <BestDeal />
                <BeExclusive />
                <CheckoutNewArrivals />
                <ShopByCategory />
                <CountryLightSection />
                <BestSeller />
                <SummerSection />
                <GentleFormalLookSection />
                <CardFooterSection />
                <FooterSliderSection />
                <Footer />
            </Box>
        </ProtectedRoute>
    );
};
export default Index;
