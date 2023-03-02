import { GetServerSideProps, NextPage } from "next";
import { productLists } from "../../../../src/data/productLists";
import { genderLists } from "../../../../src/data/genderLists";
import { brandLists } from "../../../../src/data/brandLists";
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
    // let gender = genderLists.find(gender => gender.slug === context.query.gender);
    // let brand = brandLists.find(brand => brand.slug === context.query.brand);

    // let result = productLists.filter(
    //   productItem => productItem.gender === gender?.id && productItem.brand === brand?.id
    // );

    // return {
    //   props: { products: result }
    // };

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
