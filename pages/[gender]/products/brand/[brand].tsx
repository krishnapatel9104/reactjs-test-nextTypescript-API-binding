import { GetServerSideProps, NextPage } from 'next';
import { productLists } from '../../../../src/data/productLists';
import { genderLists } from '../../../../src/data/genderLists';
import { brandLists } from '../../../../src/data/brandLists';
import CategroyDetails from '../../../../src/components/CategoryDetails/CategroyDetails';
import { productsType } from '../../../../src/types/constants/products.type';
interface BrandProductPageProps {
  products: productsType[];
}

const BrandProductPage: NextPage<BrandProductPageProps> = ({ products }) => {
  return (
    <>
      <CategroyDetails products={products} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  let gender = genderLists.find(gender => gender.slug === context.query.gender);
  let brand = brandLists.find(brand => brand.slug === context.query.brand);

  let result = productLists.filter(
    productItem => productItem.gender === gender?.id && productItem.brand === brand?.id
  );

  return {
    props: { products: result }
  };
};
export default BrandProductPage;
