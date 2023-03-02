import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Slider,
    Typography,
    Button,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { categoryLists } from "../../data/categoryLists";
import { brandLists } from "../../data/brandLists";
import { sizeLists } from "../../data/sizeLists";
interface FilterComponentProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    priceFilter: [number, number];
    priceRange: [number, number];
    setPriceFilter: (e: [number, number]) => void;
    brandFilter: number[];
    categoryFilter: number[];
    sizeFilter: number[];
}
const FilterComponent: React.FC<FilterComponentProps> = ({
    isOpen,
    setIsOpen,
    handleChange,
    priceFilter,
    priceRange,
    setPriceFilter,
    brandFilter,
    categoryFilter,
    sizeFilter,
}) => {
    const [isBrandExtend, setIsBrandExtend] = useState<boolean>(false);
    const [isCategorydExtend, setIsCategoryExtend] = useState<boolean>(false);

    const handlerExtendFilters = (type: string) => {
        if (type === "brand") setIsBrandExtend(!isBrandExtend);
        else if (type === "category") setIsCategoryExtend(!isCategorydExtend);
    };

    console.log("priceRange and priceFilter : ", priceRange, priceFilter);

    return (
        <>
            {isOpen ? (
                <Box
                    sx={{
                        width: { xs: "40%", sm: "30%" },
                        display: "flex",
                        flexDirection: "column",
                        gap: "40px",
                        position: "absolute",
                        top: "93px",
                        left: 0,
                        zIndex: 1,
                        backgroundColor: "white",
                        padding: "0 30px",
                    }}
                >
                    <Box
                        sx={{
                            marginTop: "50px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: "Jost",
                                fontWeight: "600",
                                fontSize: "16px",
                                letterSpacing: "0.02em",
                                textTransform: "uppercase",
                                color: "#1F2937",
                                marginBottom: "10px",
                            }}
                        >
                            Filter
                        </Typography>
                        <Image
                            src={"/images/closeicon.png"}
                            alt="closeicon"
                            height={20}
                            width={20}
                            onClick={() => setIsOpen(!isOpen)}
                        />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "Jost",
                                fontWeight: "600",
                                fontSize: "16px",
                                letterSpacing: "0.02em",
                                textTransform: "uppercase",
                                color: "#1F2937",
                                marginBottom: "10px",
                            }}
                        >
                            PRICES
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Typography
                                id="range-slider"
                                gutterBottom
                                sx={{
                                    fontFamily: "Jost",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                    letterSpacing: "0.02em",
                                    color: "#4B5563",
                                }}
                            >
                                Range
                            </Typography>
                            <Typography
                                id="range-slider"
                                gutterBottom
                                sx={{
                                    fontFamily: "Jost",
                                    fontWeight: "500",
                                    fontSize: "20px",
                                    letterSpacing: "0.02em",
                                    color: "#1F2937",
                                }}
                            >
                                {priceFilter[0] === 0
                                    ? priceRange[0] - priceRange[1]
                                    : priceFilter[0] - priceFilter[1]}
                            </Typography>
                        </Box>
                        <Slider
                            sx={{
                                color: "#EB5757",
                            }}
                            value={
                                priceFilter[0] === 0 ? priceRange : priceFilter
                            }
                            onChange={(_, value) =>
                                setPriceFilter(value as [number, number])
                            }
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            max={2000}
                            min={1}
                            name="price"
                            disableSwap
                            getAriaLabel={() => "Minimum distance"}
                        />
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "Jost",
                                fontWeight: "600",
                                fontSize: "16px",
                                letterSpacing: "0.02em",
                                textTransform: "uppercase",
                                color: "#1F2937",
                                marginBottom: "10px",
                            }}
                        >
                            BRANDS
                        </Typography>
                        {brandLists.map((filter, index) => {
                            if (
                                (isBrandExtend && index < brandLists.length) ||
                                (!isBrandExtend && index < 10)
                            ) {
                                return (
                                    <FormGroup
                                        key={filter.id}
                                        sx={{
                                            fontFamily: "Jost",
                                            fontWeight: "400",
                                            fontSize: "20px",
                                            letterSpacing: "0.02em",
                                            color: "#1F2937",
                                        }}
                                    >
                                        <FormControlLabel
                                            label={filter.name}
                                            control={
                                                <Checkbox
                                                    checked={brandFilter.includes(
                                                        filter.id
                                                    )}
                                                    value={filter.id}
                                                    name="brand"
                                                    onChange={handleChange}
                                                />
                                            }
                                        />
                                    </FormGroup>
                                );
                            }
                        })}
                        {brandLists.length > 10 ? (
                            !isBrandExtend ? (
                                <Button
                                    onClick={() =>
                                        handlerExtendFilters("brand")
                                    }
                                >
                                    +{brandLists.length - 10} more
                                </Button>
                            ) : (
                                <Button
                                    onClick={() =>
                                        handlerExtendFilters("brand")
                                    }
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    See Less
                                </Button>
                            )
                        ) : (
                            <></>
                        )}
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "Jost",
                                fontWeight: "600",
                                fontSize: "16px",
                                letterSpacing: "0.02em",
                                textTransform: "uppercase",
                                color: "#1F2937",
                                marginBottom: "10px",
                            }}
                        >
                            CATEGORIES
                        </Typography>
                        {categoryLists.map((filter, index) => {
                            if (
                                (isCategorydExtend &&
                                    index < categoryLists.length) ||
                                (!isCategorydExtend && index < 4)
                            ) {
                                return (
                                    <FormGroup
                                        key={filter.id}
                                        sx={{
                                            fontFamily: "Jost",
                                            fontWeight: "400",
                                            fontSize: "20px",
                                            letterSpacing: "0.02em",
                                            color: "#1F2937",
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={categoryFilter.includes(
                                                        filter.id
                                                    )}
                                                    value={filter.id}
                                                    name="category"
                                                    onChange={handleChange}
                                                />
                                            }
                                            label={filter.name}
                                        />
                                    </FormGroup>
                                );
                            }
                        })}
                        {categoryLists.length > 4 ? (
                            !isBrandExtend ? (
                                <Button
                                    onClick={() =>
                                        handlerExtendFilters("category")
                                    }
                                >
                                    +{categoryLists.length - 4} more
                                </Button>
                            ) : (
                                <Button
                                    onClick={() =>
                                        handlerExtendFilters("category")
                                    }
                                    sx={{ textTransform: "capitalize" }}
                                >
                                    See Less
                                </Button>
                            )
                        ) : (
                            <></>
                        )}
                    </Box>
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: "Jost",
                                fontWeight: "600",
                                fontSize: "16px",
                                letterSpacing: "0.02em",
                                textTransform: "uppercase",
                                color: "#1F2937",
                                marginBottom: "10px",
                            }}
                        >
                            SIZE
                        </Typography>
                        {sizeLists.map((filter, index) => {
                            return (
                                <FormGroup
                                    key={index}
                                    sx={{
                                        fontFamily: "Jost",
                                        fontWeight: "400",
                                        fontSize: "20px",
                                        letterSpacing: "0.02em",
                                        color: "#1F2937",
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={sizeFilter.includes(
                                                    filter.id
                                                )}
                                                value={filter.id}
                                                name="size"
                                                onChange={handleChange}
                                            />
                                        }
                                        label={filter.name}
                                    />
                                </FormGroup>
                            );
                        })}
                    </Box>
                </Box>
            ) : (
                <></>
            )}
            <Box
                sx={{
                    width: "30%",
                    display: { md: "flex", xs: "none" },
                    flexDirection: "column",
                    gap: "40px",
                }}
            >
                <Box sx={{ marginTop: "70px" }}>
                    <Typography
                        sx={{
                            fontFamily: "Jost",
                            fontWeight: "600",
                            fontSize: "16px",
                            letterSpacing: "0.02em",
                            textTransform: "uppercase",
                            color: "#1F2937",
                            marginBottom: "10px",
                        }}
                    >
                        Filter
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "Jost",
                            fontWeight: "600",
                            fontSize: "16px",
                            letterSpacing: "0.02em",
                            textTransform: "uppercase",
                            color: "#1F2937",
                            marginBottom: "10px",
                        }}
                    >
                        PRICES
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            id="range-slider"
                            gutterBottom
                            sx={{
                                fontFamily: "Jost",
                                fontWeight: "400",
                                fontSize: "20px",
                                letterSpacing: "0.02em",
                                color: "#4B5563",
                            }}
                        >
                            Range
                        </Typography>
                        <Typography
                            id="range-slider"
                            gutterBottom
                            sx={{
                                fontFamily: "Jost",
                                fontWeight: "500",
                                fontSize: "20px",
                                letterSpacing: "0.02em",
                                color: "#1F2937",
                            }}
                        >
                            ${priceFilter[0]}-$
                            {priceFilter[1]}
                        </Typography>
                    </Box>
                    <Slider
                        sx={{
                            color: "#EB5757",
                        }}
                        value={priceFilter}
                        onChange={(_, value) =>
                            setPriceFilter(value as [number, number])
                        }
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        max={2000}
                        min={1}
                        name="price"
                        disableSwap
                        getAriaLabel={() => "Minimum distance"}
                    />
                </Box>
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "Jost",
                            fontWeight: "600",
                            fontSize: "16px",
                            letterSpacing: "0.02em",
                            textTransform: "uppercase",
                            color: "#1F2937",
                            marginBottom: "10px",
                        }}
                    >
                        BRANDS
                    </Typography>
                    {brandLists.map((filter, index) => {
                        if (
                            (isBrandExtend && index < brandLists.length) ||
                            (!isBrandExtend && index < 10)
                        ) {
                            return (
                                <FormGroup
                                    key={filter.id}
                                    sx={{
                                        fontFamily: "Jost",
                                        fontWeight: "400",
                                        fontSize: "20px",
                                        letterSpacing: "0.02em",
                                        color: "#1F2937",
                                    }}
                                >
                                    <FormControlLabel
                                        label={filter.name}
                                        control={
                                            <Checkbox
                                                checked={brandFilter.includes(
                                                    filter.id
                                                )}
                                                value={filter.id}
                                                name="brand"
                                                onChange={handleChange}
                                            />
                                        }
                                    />
                                </FormGroup>
                            );
                        }
                    })}
                    {brandLists.length > 10 ? (
                        !isBrandExtend ? (
                            <Button
                                onClick={() => handlerExtendFilters("brand")}
                            >
                                +{brandLists.length - 10} more
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handlerExtendFilters("brand")}
                                sx={{ textTransform: "capitalize" }}
                            >
                                See Less
                            </Button>
                        )
                    ) : (
                        <></>
                    )}
                </Box>
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "Jost",
                            fontWeight: "600",
                            fontSize: "16px",
                            letterSpacing: "0.02em",
                            textTransform: "uppercase",
                            color: "#1F2937",
                            marginBottom: "10px",
                        }}
                    >
                        CATEGORIES
                    </Typography>
                    {categoryLists.map((filter, index) => {
                        if (
                            (isCategorydExtend &&
                                index < categoryLists.length) ||
                            (!isCategorydExtend && index < 4)
                        ) {
                            return (
                                <FormGroup
                                    key={filter.id}
                                    sx={{
                                        fontFamily: "Jost",
                                        fontWeight: "400",
                                        fontSize: "20px",
                                        letterSpacing: "0.02em",
                                        color: "#1F2937",
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={categoryFilter.includes(
                                                    filter.id
                                                )}
                                                value={filter.id}
                                                name="category"
                                                onChange={handleChange}
                                            />
                                        }
                                        label={filter.name}
                                    />
                                </FormGroup>
                            );
                        }
                    })}
                    {categoryLists.length > 4 ? (
                        !isCategorydExtend ? (
                            <Button
                                onClick={() => handlerExtendFilters("category")}
                            >
                                +{categoryLists.length - 4} more
                            </Button>
                        ) : (
                            <Button
                                onClick={() => handlerExtendFilters("category")}
                                sx={{ textTransform: "capitalize" }}
                            >
                                See Less
                            </Button>
                        )
                    ) : (
                        <></>
                    )}
                </Box>
                <Box>
                    <Typography
                        sx={{
                            fontFamily: "Jost",
                            fontWeight: "600",
                            fontSize: "16px",
                            letterSpacing: "0.02em",
                            textTransform: "uppercase",
                            color: "#1F2937",
                            marginBottom: "10px",
                        }}
                    >
                        SIZE
                    </Typography>
                    {sizeLists.map((filter, index) => {
                        return (
                            <FormGroup
                                key={index}
                                sx={{
                                    fontFamily: "Jost",
                                    fontWeight: "400",
                                    fontSize: "20px",
                                    letterSpacing: "0.02em",
                                    color: "#1F2937",
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            key={index}
                                            checked={sizeFilter.includes(
                                                filter.id
                                            )}
                                            value={filter.id}
                                            name="size"
                                            onChange={handleChange}
                                        />
                                    }
                                    label={filter.name}
                                />
                            </FormGroup>
                        );
                    })}
                </Box>
            </Box>
            <Box
                sx={{
                    width: "10%",
                    display: {
                        xs: "flex",
                        md: "none",
                    },
                    flexDirection: "column",
                    gap: "40px",
                    marginTop: "20px",
                    position: "relative",
                }}
            >
                <Image
                    src={"/images/arrowicon.png"}
                    alt="menuicon"
                    height={25}
                    width={25}
                    onClick={() => setIsOpen(!isOpen)}
                />
            </Box>
        </>
    );
};
export default FilterComponent;
