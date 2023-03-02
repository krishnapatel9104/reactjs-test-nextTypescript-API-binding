import {
    Box,
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import { useSelector, useDispatch } from "../../store";
import Image from "next/image";
import axios from "axios";
import baseURL from "../../api";
import { sizeType } from "../../types/constants/size.type";
import { colorType } from "../../types/constants/color.type";
import {
    deleteProductToCart,
    updateProductToCart,
} from "../../store/reducers/productDetailsLists/productLists.api";
import { getCartProductType } from "../../types/redux/cartProductLists.type";

interface YourOrderProps {
    isCheckout?: boolean;
}
export const YourOrder: React.FC<YourOrderProps> = ({ isCheckout }) => {
    const dispatch = useDispatch();
    const [sizeLists, setSizeLists] = useState<sizeType[]>();
    const [colorLists, setColorLists] = useState<colorType[]>();
    const [productDetails, setProductDetails] = useState<getCartProductType[]>();

    useEffect(() => {
        const callApi = async () => {
            await axios.get(`${baseURL}/size`).then((response) => {
                setSizeLists(response.data);
            });
            await axios.get(`${baseURL}/color`).then((response) => {
                setColorLists(response.data);
            });
        };
        callApi();
    }, []);

    const reduxProductDetails = useSelector(
        (state) => state.productListsSlice.cartItemsDetails
    );
    const totalInfo = useSelector((state) => state.productListsSlice.totalInfo);

    useEffect(() => {
        if (reduxProductDetails.length > 0) {
            const callApi = async () => {
                let product = (
                    await axios.get(`${baseURL}/Product/cart`, {
                        params: {
                            id: reduxProductDetails[0].cartId,
                        },
                    })
                ).data.filterData;
                setProductDetails(product);
            };
            callApi();
        }
    }, [reduxProductDetails]);

    const handleClick = (id: number) => {
        dispatch(deleteProductToCart(id));
    };
    const handleQuantityChange = (
        identifier: string,
        id: number | undefined
    ) => {
        if (identifier === "add" && id) {
            dispatch(updateProductToCart({ id: id, quantity: "add" }));
        }
        if (identifier === "less" && id) {
            dispatch(updateProductToCart({ id: id, quantity: "less" }));
        }
    };
    const handleChange = (e: SelectChangeEvent<number>, id: number) => {
        const { name, value } = e.target;
        if (name === "size" && id) {
            dispatch(
                updateProductToCart({
                    id: id,
                    size: typeof value === "string" ? parseInt(value) : value,
                })
            );
        }
        if (name === "color" && id) {
            dispatch(
                updateProductToCart({
                    id: id,
                    color: typeof value === "string" ? parseInt(value) : value,
                })
            );
        }
    };

    if (!sizeLists || !colorLists) return <></>;
    return (
        <Box
            sx={{
                color: "#616161",
                padding: { xs: "20px", md: "30px", lg: "50px" },
                backgroundColor: "#EFEFF4",
                borderRadius: "34px",
                height: "770px",
                overflowY: "scroll",
            }}
        >
            <Typography
                sx={{
                    fontSize: "25px",
                    fontWeight: "700",
                }}
            >
                Your Order
            </Typography>
            {productDetails &&
                productDetails?.map(
                    (order: getCartProductType, index: number) => {
                        let sizeObjects =
                            sizeLists &&
                            sizeLists.filter((s) => {
                                return order.products.size
                                    .map(Number)
                                    .includes(s.id);
                            });
                        let colorObjects =
                            colorLists &&
                            colorLists.filter((s) => {
                                return order.products.color
                                    .map(Number)
                                    .includes(s.id);
                            });
                        return (
                            <Box key={index}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: { xs: "30px", md: "50px" },
                                        alignItems: {
                                            xs: "flex-start",
                                            sm: "center",
                                        },
                                        flexDirection: { xs: "row" },
                                        gap: { xs: "20px", md: "0" },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            fontSize: "19px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {order?.products.productName}
                                    </Box>
                                    {!isCheckout && (
                                        <Box>
                                            <Button
                                                sx={{ color: "red" }}
                                                onClick={(e) =>
                                                    handleClick(order.id || 0)
                                                }
                                            >
                                                <DeleteOutlineSharpIcon />
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        margin: "20px 0",
                                        alignItems: {
                                            xs: "flex-start",
                                            md: "center",
                                        },
                                        flexDirection: {
                                            xs: "column",
                                            sm: "row",
                                        },
                                        gap: { xs: "20px", md: "0" },
                                        marginRight: "40px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "50px",
                                        }}
                                    >
                                        <Box>
                                            <Image
                                                src={
                                                    order?.products
                                                        .productImages[0] || ""
                                                }
                                                alt="imageicon"
                                                height={65}
                                                width={55}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                opacity: "0.8",
                                            }}
                                        >
                                            {order?.products.productDescription.map(
                                                (
                                                    desc: string,
                                                    index: number
                                                ) => {
                                                    return (
                                                        <Typography key={index}>
                                                            -{desc}
                                                        </Typography>
                                                    );
                                                }
                                            )}
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                fontWeight: "500",
                                            }}
                                        >
                                            Quantity
                                        </Box>
                                        {!isCheckout ? (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: "20px",
                                                    marginTop: "25px",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Button
                                                    sx={{
                                                        border:
                                                            order.quantity === 1
                                                                ? "2px solid #bbacac"
                                                                : "2px solid red",
                                                        color: "red",
                                                        minWidth: 0,
                                                        padding: 0,
                                                    }}
                                                    name="less"
                                                    disabled={
                                                        order.quantity === 1
                                                    }
                                                    onClick={(e) =>
                                                        handleQuantityChange(
                                                            "less",
                                                            order.id
                                                        )
                                                    }
                                                >
                                                    <RemoveSharpIcon
                                                        style={{
                                                            color:
                                                                order.quantity ===
                                                                1
                                                                    ? "#bbacac"
                                                                    : "red",
                                                        }}
                                                    />
                                                </Button>
                                                {order.quantity}
                                                <Button
                                                    sx={{
                                                        border: "2px solid red",
                                                        color: "red",
                                                        minWidth: 0,
                                                        padding: 0,
                                                    }}
                                                    name="add"
                                                    onClick={(e) =>
                                                        handleQuantityChange(
                                                            "add",
                                                            order.id
                                                        )
                                                    }
                                                >
                                                    <AddSharpIcon />
                                                </Button>
                                            </Box>
                                        ) : (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: "20px",
                                                    marginTop: "25px",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {/* <Button
                                            sx={{
                                                border:
                                                    order.quantity === 1
                                                        ? "2px solid #bbacac"
                                                        : "2px solid red",
                                                color: "red",
                                                minWidth: 0,
                                                padding: 0,
                                            }}
                                            name="less"
                                            disabled={order.quantity === 1}
                                            onClick={(e) =>
                                                handleQuantityChange(
                                                    "less",
                                                    order.id
                                                )
                                            }
                                        >
                                            <RemoveSharpIcon
                                                style={{
                                                    color:
                                                        order.quantity === 1
                                                            ? "#bbacac"
                                                            : "red",
                                                }}
                                            />
                                        </Button> */}
                                                {order.quantity}
                                                {/* <Button
                                            sx={{
                                                border: "2px solid red",
                                                color: "red",
                                                minWidth: 0,
                                                padding: 0,
                                            }}
                                            name="add"
                                            onClick={(e) =>
                                                handleQuantityChange(
                                                    "add",
                                                    order.id
                                                )
                                            }
                                        >
                                            <AddSharpIcon />
                                        </Button> */}
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: "20px",
                                        alignItems: {
                                            xs: "flex-start",
                                            md: "flex-end",
                                        },
                                        flexDirection: {
                                            xs: "column",
                                            sm: "row",
                                        },
                                        gap: { xs: "20px", md: "0" },
                                    }}
                                >
                                    <Box>
                                        <Box
                                            sx={{
                                                fontWeight: "500",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Size
                                        </Box>
                                        <Box sx={{ marginTop: "20px" }}>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                name="size"
                                                disabled={isCheckout}
                                                value={
                                                    sizeObjects &&
                                                    sizeObjects.find(
                                                        (size) =>
                                                            size.id ===
                                                            order.size
                                                    )?.id
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        order.id || 0
                                                    )
                                                }
                                                sx={{
                                                    width: {
                                                        xs: "170px",
                                                        md: "140px",
                                                        lg: "170px",
                                                    },
                                                }}
                                            >
                                                {sizeObjects &&
                                                    sizeObjects.map(
                                                        (size, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={size.id}
                                                                sx={{
                                                                    padding:
                                                                        "10px 10px",
                                                                }}
                                                            >
                                                                {size.name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                            </Select>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Box
                                            sx={{
                                                fontWeight: "500",
                                                fontSize: "16px",
                                            }}
                                        >
                                            Colour
                                        </Box>
                                        <Box sx={{ marginTop: "20px" }}>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                name="color"
                                                disabled={isCheckout}
                                                value={
                                                    colorObjects &&
                                                    colorObjects.find(
                                                        (color) =>
                                                            color.id ===
                                                            order.color
                                                    )?.id
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        e,
                                                        order.id || 0
                                                    )
                                                }
                                                sx={{
                                                    width: {
                                                        xs: "170px",
                                                        md: "140px",
                                                        lg: "170px",
                                                    },
                                                }}
                                            >
                                                {colorObjects &&
                                                    colorObjects.map(
                                                        (color, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={color.id}
                                                                sx={{
                                                                    padding:
                                                                        "10px 10px",
                                                                }}
                                                            >
                                                                {color.name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                            </Select>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography
                                            sx={{
                                                color: "#616161",
                                                fontSize: "22px",
                                                fontWeight: "700",
                                            }}
                                        >
                                            $
                                            {
                                                order?.products
                                                    .productCurrentPrice
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        );
                    }
                )}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                }}
            >
                <Box
                    sx={{
                        color: "#616161",
                        opacity: "0.8",
                        fontSize: "16px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <Typography>Subtotal</Typography>
                    <Typography>Shipping</Typography>
                    <Typography>Vat,tax</Typography>
                    <Typography
                        sx={{
                            color: "#616161",
                            fontSize: "22px",
                            fontWeight: "700",
                            marginTop: "25px",
                        }}
                    >
                        Total
                    </Typography>
                </Box>
                <Box
                    sx={{
                        color: "#616161",
                        opacity: "0.8",
                        fontSize: "18px",
                        fontWeight: "600",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <Typography>${totalInfo.subTotal}</Typography>
                    <Typography>${totalInfo.subTotal}</Typography>
                    <Typography>${totalInfo.subTotal}</Typography>
                    <Typography
                        sx={{
                            color: "#616161",
                            fontSize: "22px",
                            fontWeight: "700",
                            marginTop: "25px",
                        }}
                    >
                        ${totalInfo.grandTotal}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};
