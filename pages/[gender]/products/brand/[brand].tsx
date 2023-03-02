import { GetServerSideProps, NextPage } from "next";
import CategroyDetails from "../../../../src/components/CategoryDetails/CategroyDetails";
import { productsType } from "../../../../src/types/constants/products.type";
import axios from "axios";
import baseURL from "../../../../src/api";
import { genderType } from "../../../../src/types/constants/gender.type";
import { brandType } from "../../../../src/types/constants/brand.type";
interface BrandProductPageProps {
    products: productsType[];
    totalCount?: number;
}

const BrandProductPage: NextPage<BrandProductPageProps> = ({
    products,
    totalCount,
}) => {
    return (
        <>
            <CategroyDetails products={products} totalCount={totalCount} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const brandLists = (await axios.get(`${baseURL}/brand`)).data;
    const genderLists = (await axios.get(`${baseURL}/gender`)).data;
    let gender = genderLists.find(
        (gender: genderType) => gender.slug === context.query.gender
    );
    let brand = brandLists.find(
        (brand: brandType) => brand.slug === context.query.brand
    );
    const result = (
        await axios.get(`${baseURL}/product`, {
            params: {
                gender: gender.id,
                brand: brand.id,
                page: 1,
                per_page: 9,
            },
        })
    ).data;
    return {
        props: {
            products: result.filterData,
            totalCount: result.totalCount,
        },
    };
};
export default BrandProductPage;
