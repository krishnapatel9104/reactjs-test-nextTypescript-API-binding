import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import { useRouter } from "next/router";
import { FC } from "react";
import { productsType } from "../../types/constants/products.type";
import FilterComponent from "./FilterComponent";
import ProductCatelog from "./ProductCatelog";
import axios from "axios";
import baseURL from "../../api";
import { brandType } from "../../types/constants/brand.type";
import { categoryType } from "../../types/constants/category.type";
import { genderType } from "../../types/constants/gender.type";
import { sizeType } from "../../types/constants/size.type";

interface categoryDetailsProps {
    products: productsType[];
    totalCount?: number;
    priceRange: [number, number];
    gender: number;
    category?: number;
    brand?: number;
    type: string;
}
const CategroyDetails: FC<categoryDetailsProps> = ({
    products,
    totalCount,
    priceRange,
    gender,
    category,
    brand,
    type,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const themes = useTheme();
    const matches = useMediaQuery(themes.breakpoints.up("md"));
    if (matches && isOpen) setIsOpen(false);
    const [brandFilter, setBrandFilter] = useState<number[]>(
        brand ? [brand] : []
    );
    const [sizeFilter, setSizeFilter] = useState<number[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<number[]>(
        category ? [category] : []
    );
    const [priceFilter, setPriceFilter] =
        useState<[number, number]>(priceRange);
    const [selectedGender, setSelectedGender] = useState<number>(gender);
    const [totalCounts, setTotalCounts] = useState<number>(totalCount || 0);
    const [selectedType, setSelectedType] = useState<string>(type);
    const [brandLists, setBrandLists] = useState<brandType[]>();
    const [categoryLists, setCategoryLists] = useState<categoryType[]>();
    const [sizeLists, setSizeLists] = useState<sizeType[]>();
    const [filterCategoryData, setFilterCategoryData] =
        useState<productsType[]>(products);
    const [page, setPage] = useState<number>(1);
    const PER_PAGE = 9;
    const [count, setCount] = useState(
        Math.ceil(totalCount ? totalCount : 0 / PER_PAGE)
    );
    const router = useRouter();

    useEffect(() => {
        setCategoryFilter(category ? [category] : []);
        setBrandFilter(brand ? [brand] : []);
        setSelectedType(type);
        setSelectedGender(gender);
        setTotalCounts(totalCount || 0);
        setPriceFilter(priceRange);
        setFilterCategoryData(products);
    }, [products, totalCount, priceRange, gender, category, type]);

    useEffect(() => {
        const callApi = async () => {
            await axios.get(`${baseURL}/brand`).then((response) => {
                setBrandLists(response.data);
            });
            await axios.get(`${baseURL}/category`).then((response) => {
                setCategoryLists(response.data);
            });
            await axios.get(`${baseURL}/size`).then((response) => {
                setSizeLists(response.data);
            });
        };
        callApi();
    }, []);

    const apiCall = async () => {
        const result = (
            await axios.get(`${baseURL}/product`, {
                params: {
                    gender: selectedGender,
                    categoryFilters: categoryFilter,
                    brandFilters: brandFilter,
                    sizeFilters: sizeFilter,
                    priceFilters: priceFilter,
                    page: page,
                    per_page: PER_PAGE,
                },
            })
        ).data;
        setCount(Math.ceil(result.totalCount / PER_PAGE));
        setTotalCounts(result.totalCount);
        setFilterCategoryData(result.filterData);
    };

    useEffect(() => {
        if (
            selectedGender &&
            (categoryFilter.length > 0 || brandFilter.length > 0)
        ) {
            apiCall();
        }
    }, [brandFilter, categoryFilter, sizeFilter, priceFilter]);

    const handleProductClick = (productDetail: productsType) => {
        setIsOpen(!isOpen);
        router.replace(
            {
                pathname: `/product/${productDetail.slug}`,
                query: { productId: productDetail.id },
            }
            // `/product/${productDetail.slug}`
        );
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = parseInt(e.target.value);
        if (name === "brand") {
            if (brandFilter[0] !== value && !brandFilter.includes(value)) {
                setBrandFilter([...brandFilter, value]);
            } else {
                if (selectedType === "brand" && brandFilter[0] !== value) {
                    let newBrandFilter = brandFilter.filter(
                        (brand) => brand !== value
                    );
                    setBrandFilter(newBrandFilter);
                } else if (
                    selectedType !== "brand" &&
                    brandFilter[0] === value
                ) {
                    let newBrandFilter = brandFilter.filter(
                        (brand) => brand !== value
                    );
                    setBrandFilter(newBrandFilter);
                }
            }
        }
        if (name === "category") {
            if (
                categoryFilter[0] !== value &&
                !categoryFilter.includes(value)
            ) {
                setCategoryFilter([...categoryFilter, value]);
            } else {
                if (
                    selectedType === "category" &&
                    categoryFilter[0] !== value
                ) {
                    let newCategoryFilter = categoryFilter.filter(
                        (category) => category !== value
                    );
                    setCategoryFilter(newCategoryFilter);
                } else if (
                    selectedType !== "category" &&
                    categoryFilter[0] === value
                ) {
                    let newCategoryFilter = categoryFilter.filter(
                        (category) => category !== value
                    );
                    setCategoryFilter(newCategoryFilter);
                }
            }
        }
        if (name === "size") {
            if (!sizeFilter.includes(value)) {
                setSizeFilter([...sizeFilter, value]);
            } else {
                let newSizeFilter = sizeFilter.filter((size) => size !== value);
                setSizeFilter(newSizeFilter);
            }
        }
    };

    const handleChangePagination = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        setPage(page);
    };
    useEffect(() => {
        if (
            selectedGender &&
            (categoryFilter.length > 0 || brandFilter.length > 0)
        ) {
            apiCall();
        }
    }, [page]);

    if (!brandLists || !categoryLists || !sizeLists) return <></>;
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
                            xl: "0 290px",
                            md: "0 140px",
                            sm: "0 40px",
                            xs: "0 30px",
                        },
                        display: "flex",
                        gap: "60px",
                    }}
                >
                    <FilterComponent
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        handleChange={handleChange}
                        priceFilter={priceFilter}
                        setPriceFilter={setPriceFilter}
                        sizeFilter={sizeFilter}
                        categoryFilter={categoryFilter}
                        brandFilter={brandFilter}
                        brandLists={brandLists}
                        categoryLists={categoryLists}
                        sizeLists={sizeLists}
                    />
                    <ProductCatelog
                        count={count}
                        handleChangePagination={(event, page) =>
                            handleChangePagination(event, page)
                        }
                        page={page}
                        filterCategoryData={filterCategoryData}
                        handleProductClick={(productDetail) =>
                            handleProductClick(productDetail)
                        }
                        totalCount={totalCounts}
                    />
                </Box>
            </Box>
        </ProtectedRoute>
    );
};
export default CategroyDetails;
