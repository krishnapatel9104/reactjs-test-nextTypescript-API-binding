import { GetServerSideProps, NextPage } from 'next';
import { productLists } from '../../../../src/data/productLists';
import { genderLists } from '../../../../src/data/genderLists';
import { categoryLists } from '../../../../src/data/categoryLists';
import CategroyDetails from '../../../../src/components/CategoryDetails/CategroyDetails';
import { productsType } from '../../../../src/types/constants/products.type';
interface CategoryProductPageProps {
  products: productsType[];
}

const CategoryProductPage: NextPage<CategoryProductPageProps> = ({ products }) => {
  return (
    <>
      <CategroyDetails products={products} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  let gender = genderLists.find(gender => gender.slug === context.query.gender);
  let category = categoryLists.find(category => category.slug === context.query.category);
  let result = productLists.filter(
    productItem => productItem.gender === gender?.id && productItem.category === category?.id
  );

  return {
    props: { products: result }
  };
};
export default CategoryProductPage;
