import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userCartProductsType, userCartProductType } from "../../../types/redux/userSelectedProductList.type";
import { deleteUserSelectedProductListType, updateUserSelectedProductListType } from '../../../types/redux/updateUserSelectedProductList.type';

const initialState: userCartProductsType = {
  cartProductDetails: []
};
export const userSelectedProductListSlice = createSlice({
  name: "userSelectedProductList",
  initialState: initialState,
  reducers: {
    setUserSelectedProductList: (state: userCartProductsType, action: PayloadAction<userCartProductType>) => {
      let uniqueProductId = Math.floor((Math.random() * 100) + 1);
      if (state.cartProductDetails) {
        let alreadyExist = state.cartProductDetails.findIndex((product) => {
          return product.productId === action.payload.productId && product.size === action.payload.size && product.color === action.payload.color;
        });

        if (alreadyExist === -1) {
          action.payload.id = uniqueProductId;
          return {
            ...state,
            cartProductDetails: state.cartProductDetails.concat(action.payload),
          };
        } else {
          let newArrayObj = [...state.cartProductDetails];
          if (newArrayObj[alreadyExist].size !== action.payload.size && newArrayObj[alreadyExist].color !== action.payload.color) {
            action.payload.id = uniqueProductId;
            return {
              ...state,
              cartProductDetails: state.cartProductDetails.concat(action.payload),
            };
          } else {
            newArrayObj[alreadyExist] = {
              ...newArrayObj[alreadyExist],
              quantity: newArrayObj[alreadyExist].quantity + 1,
            };
            return {
              ...state,
              cartProductDetails: newArrayObj,
            };
          }
        }
      }
    },
    deleteSelectedProductList: (state: userCartProductsType, action: PayloadAction<deleteUserSelectedProductListType>) => {
      let list = state.cartProductDetails.filter((product) => product.id !== action.payload.id)
      return {
        ...state,
        cartProductDetails: list
      };
    },
    updateUserSelectedProductList: (state: userCartProductsType, action: PayloadAction<updateUserSelectedProductListType>) => {
      let result = state.cartProductDetails.map((product) => {
        if (product.id === action.payload.id) {
          if (action.payload?.quantity) {
            return {
              ...product,
              quantity:
                action.payload.quantity === "add" ? product.quantity + 1 : product.quantity - 1,
            };
          }
          if (action.payload?.size) {
            return {
              ...product,
              size: action.payload.size,
            };
          }
          if (action.payload?.color) {
            return {
              ...product,
              color: action.payload.color,
            };
          } else {
            return {
              ...product,
            }
          }
        } else {
          return {
            ...product
          }
        }
      });
      return {
        ...state,
        cartProductDetails: result ? result : []
      };
    },
    resetUserSelectedProductList: (state: userCartProductsType) => {
      return {
        ...state,
        cartProductDetails: [],
      };
    },
    restoreUserSelectedProductList: (state: userCartProductsType, action: PayloadAction<userCartProductType[]>) => {
      return {
        ...state,
        cartProductDetails: action.payload,
      };
    },
  },
});

export const {
  setUserSelectedProductList,
  updateUserSelectedProductList,
  resetUserSelectedProductList,
  deleteSelectedProductList,
  restoreUserSelectedProductList,
} = userSelectedProductListSlice.actions;

export default userSelectedProductListSlice.reducer;
