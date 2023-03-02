import React from "react";
import { GetServerSideProps, NextPage } from "next";
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
    const result = (
        await axios.get(`${baseURL}/product`, {
            params: {
                id: query.productId,
            },
        })
    ).data.filterData;
    return {
        props: { product: result || [] },
    };
};
export default ItemDetailViewPage;
