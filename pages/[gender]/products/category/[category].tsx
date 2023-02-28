import { GetServerSideProps, NextPage } from "next";
import CategroyDetails from "../../../../src/components/CategoryDetails/CategroyDetails";
import { productsType } from "../../../../src/types/constants/products.type";
import axios from "axios";
import baseURL from "../../../../src/api";
import { genderType } from "../../../../src/types/constants/gender.type";
import { categoryType } from "../../../../src/types/constants/category.type";
interface CategoryProductPageProps {
    products: productsType[];
    totalCount?: number;
}

const CategoryProductPage: NextPage<CategoryProductPageProps> = ({
    products,
    totalCount,
}) => {
    return (
        <>
            <CategroyDetails
                products={products}
                totalCount={totalCount}
            />
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const categoryLists = (await axios.get(`${baseURL}/category`)).data;
    const genderLists = (await axios.get(`${baseURL}/gender`)).data;
    let gender = genderLists.find(
        (gender: genderType) => gender.slug === context.query.gender
    );
    let category = categoryLists.find(
        (category: categoryType) => category.slug === context.query.category
    );
    const result = (
        await axios.get(`${baseURL}/product`, {
            params: {
                gender: gender.id,
                category: category.id,
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
export default CategoryProductPage;
