import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import { useRouter } from "next/router";
import { FC } from "react";
import { productsType } from "../../types/constants/products.type";
// import { categoryLists } from "../../data/categoryLists";
// import { productLists } from "../../data/productLists";
// import { brandLists } from "../../data/brandLists";
// import { genderLists } from "../../data/genderLists";
import FilterComponent from "./FilterComponent";
import ProductCatelog from "./ProductCatelog";
import { dispatch, useDispatch } from "../../store";
// import { setFilterProductLists } from "../../store/reducers/productDetailsLists/productLists.slice";
import axios from "axios";
import baseURL from "../../api";
import { brandType } from "../../types/constants/brand.type";
import { categoryType } from "../../types/constants/category.type";
import { genderType } from "../../types/constants/gender.type";

interface categoryDetailsProps {
    products: productsType[];
    totalCount?: number;
}
const CategroyDetails: FC<categoryDetailsProps> = ({
    products,
    totalCount,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const themes = useTheme();
    const matches = useMediaQuery(themes.breakpoints.up("md"));
    if (matches && isOpen) setIsOpen(false);
    const [brandFilter, setBrandFilter] = useState<number[]>([]);
    const [sizeFilter, setSizeFilter] = useState<number[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<number[]>([]);
    const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 0]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
    const [selectedGender, setSelectedGender] = useState<number>();
    const [totalCounts, setTotalCounts] = useState<number>(totalCount || 0);
    const [selectedType, setSelectedType] = useState<string>("");
    const [brandLists, setBrandLists] = useState<brandType[]>();
    const [categoryLists, setCategoryLists] = useState<categoryType[]>();
    const [genderLists, setGenderLists] = useState<genderType[]>();
    const [filterCategoryData, setFilterCategoryData] =
        useState<productsType[]>(products);
    const [page, setPage] = useState<number>(1);
    const PER_PAGE = 9;
    const [count, setCount] = useState(
        Math.ceil(totalCount ? totalCount : 0 / PER_PAGE)
    );
    // let priceRange: [number, number] = [0, 0];
    // const indexOfLastRecord = page * PER_PAGE;
    // const indexOfFirstRecord = indexOfLastRecord - PER_PAGE;
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const callApi = async () => {
            await axios.get(`${baseURL}/brand`).then((response) => {
                console.log("brand list : ", response.data);
                setBrandLists(response.data);
            });
            await axios.get(`${baseURL}/category`).then((response) => {
                console.log("category list : ", response.data);
                setCategoryLists(response.data);
            });
            await axios.get(`${baseURL}/gender`).then((response) => {
                console.log("gender list : ", response.data);
                setGenderLists(response.data);
            });
        };
        callApi();
    }, []);

    useEffect(() => {
        let curRoute = router.asPath;
        let genderValue = curRoute.split("/")[1];
        let object = genderLists?.find((gender) => gender.slug === genderValue);
        if (object) setSelectedGender(object.id);
        let brandOrCategoryType = curRoute.split("/")[3];
        if (brandOrCategoryType) setSelectedType(brandOrCategoryType);
        let brandOrCategoryValue = curRoute.split("/")[4];
        if (
            brandOrCategoryType === "category" &&
            brandOrCategoryValue &&
            categoryLists
        ) {
            let object = categoryLists.find(
                (category) => category.slug === brandOrCategoryValue
            );
            if (object) setCategoryFilter([object.id]);
        }
        if (
            brandOrCategoryType === "brand" &&
            brandOrCategoryValue &&
            brandLists
        ) {
            let object = brandLists.find(
                (brand) => brand.slug === brandOrCategoryValue
            );
            if (object) setBrandFilter([object.id]);
        }
    }, [genderLists, categoryLists, brandLists]);

    console.log(
        "selectedgender and category ro btand : ",
        selectedGender,
        categoryFilter,
        brandFilter
    );

    const apiCall = async () => {
        console.log("inside apicall page value : ", page);

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
        console.log("FIlter data in AAAAAAAAAAAAAAA : ", result);
        // priceRange = [result.priceRange.min, result.priceRange.max];
        setPriceRange([result.priceRange.min, result.priceRange.max]);
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
    }, [brandFilter, categoryFilter, sizeFilter, selectedGender, priceFilter]);

    // useEffect(() => {
    //     setPage(1);
    //     if (filterCategoryData.length > 0) {
    //         let minPrice = Math.min(
    //             ...filterCategoryData.map(
    //                 (product) => product.productCurrentPrice
    //             )
    //         );
    //         let maxPrice = Math.max(
    //             ...filterCategoryData.map(
    //                 (product) => product.productCurrentPrice
    //             )
    //         );
    //         setPriceFilter([minPrice, maxPrice]);
    //     }
    // }, [filterCategoryData]);

    // useEffect(() => {
    //     console.log("products : ", products);
    //     let curRoute = router.asPath;
    //     let genderValue = curRoute.split("/")[1];
    //     let object = genderLists?.find((gender) => gender.slug === genderValue);
    //     if (object) setSelectedGender(object.id);
    //     let brandOrCategoryType = curRoute.split("/")[3];
    //     if (brandOrCategoryType) setSelectedType(brandOrCategoryType);
    //     let brandOrCategoryValue = curRoute.split("/")[4];
    //     if (
    //         brandOrCategoryType === "category" &&
    //         brandOrCategoryValue &&
    //         categoryLists
    //     ) {
    //         let object = categoryLists.find(
    //             (category) => category.slug === brandOrCategoryValue
    //         );
    //         if (object) setCategoryFilter([object.id]);
    //     }
    //     if (
    //         brandOrCategoryType === "brand" &&
    //         brandOrCategoryValue &&
    //         brandLists
    //     ) {
    //         let object = brandLists.find(
    //             (brand) => brand.slug === brandOrCategoryValue
    //         );
    //         if (object) setBrandFilter([object.id]);
    //     }
    //     if (products.length > 0) {
    //         let minPrice = Math.min(
    //             ...products.map((product) => product.productCurrentPrice)
    //         );
    //         let maxPrice = Math.max(
    //             ...products.map((product) => product.productCurrentPrice)
    //         );
    //         setPriceFilter([minPrice, maxPrice]);
    //     }
    // }, [products, router.asPath, brandLists, categoryLists]);

    // useEffect(() => {
    //     console.log(
    //         "brand category size price selectedgender :: ",
    //         selectedGender,
    //         brandFilter,
    //         categoryFilter,
    //         sizeFilter,
    //         priceFilter
    //     );

    //     if (brandFilter || sizeFilter || categoryFilter || priceFilter) {
    //         const callApi = async () => {
    //             await axios
    //                 .get(`${baseURL}/product`, {
    //                     params: {
    //                         brandFilters: brandFilter,
    //                         categoryFilters: categoryFilter,
    //                         sizeFilters: sizeFilter,
    //                         priceFilters: priceFilter,
    //                         gender: selectedGender,
    //                     },
    //                 })
    //                 .then((response) => {
    //                     console.log("response filters : ", response.data);

    //                     // setBestDealProducts(response.data.filterData);
    //                 });
    //         };
    //         callApi();
    //         // const newProductList = productLists.filter((product) => {
    //         //     if (
    //         //         (brandFilter.includes(product.brand) ||
    //         //             categoryFilter.includes(product.category)) &&
    //         //         product.gender === selectedGender &&
    //         //         product.productCurrentPrice >= priceFilter[0] &&
    //         //         product.productCurrentPrice <= priceFilter[1]
    //         //     ) {
    //         //         return product;
    //         //     }
    //         // });
    //         // const list = productLists.filter((product) => {
    //         //     if (product.gender === selectedGender) {
    //         //         return product.size.find((size) =>
    //         //             sizeFilter.includes(size)
    //         //         );
    //         //     }
    //         // });
    //         // let newFilterPRoductLists = [...newProductList, ...list].filter(
    //         //     (product, ind, lists) =>
    //         //         ind ===
    //         //         lists.findIndex((productId) => productId.id === product.id)
    //         // );
    //         // setFilterCategoryData(newFilterPRoductLists);
    //     }
    // }, [brandFilter, sizeFilter, categoryFilter, priceFilter]);

    // useEffect(() => {
    //     setPage(1);
    // }, [filterCategoryData]);

    const handleProductClick = (productDetail: productsType) => {
        console.log("productDetail QQQQQQQQQQQQQQQQQQQ : ", productDetail);

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
        console.log("change page number : ", page);
        setPage(page);
    };
    useEffect(() => {
        console.log("page value ::::::::: ", page);
        if (
            selectedGender &&
            (categoryFilter.length > 0 || brandFilter.length > 0)
        ) {
            apiCall();
        }
    }, [page]);

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
                        priceRange={priceRange}
                        setPriceFilter={setPriceFilter}
                        sizeFilter={sizeFilter}
                        categoryFilter={categoryFilter}
                        brandFilter={brandFilter}
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
                        // indexOfLastRecord={indexOfLastRecord}
                        // indexOfFirstRecord={indexOfFirstRecord}
                    />
                </Box>
            </Box>
        </ProtectedRoute>
    );
};
export default CategroyDetails;
