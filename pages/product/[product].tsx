import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { productLists } from "../../src/data/productLists";
import ItemDetailView from "../../src/components/ItemDetailView/ItemDetailView";
import { productsType } from "../../src/types/constants/products.type";
import axios from "axios";
import baseURL from "../../src/api";

interface itemDetailViewPageProps {
    product: productsType;
}
const ItemDetailViewPage: NextPage<itemDetailViewPageProps> = ({ product }) => {
    return <ItemDetailView product={product} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    console.log("PAGEEEEEEEEEEEEEEEEEEEEEE : ", query);
    const result = (
        await axios.get(`${baseURL}/product`, {
            params: {
                id: query.productId,
            },
        })
    ).data.filterData;
    console.log("itemview next page route result products : ", result);

    // let result = productLists.find(
    //     (productItem) =>
    //         productItem.id ===
    //         (typeof query.productId === "string" && parseInt(query.productId))
    // );
    return {
        props: { product: result || [] },
    };
};
export default ItemDetailViewPage;
