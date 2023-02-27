import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { productLists } from '../../src/data/productLists';
import ItemDetailView from '../../src/components/ItemDetailView/ItemDetailView';
import { productsType } from '../../src/types/constants/products.type';

interface itemDetailViewPageProps {
  product: productsType;
}
const ItemDetailViewPage: NextPage<itemDetailViewPageProps> = ({ product }) => {
  return <ItemDetailView product={product} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let result = productLists.find(
    productItem =>
      productItem.id === (typeof query.productId === 'string' && parseInt(query.productId))
  );
  return {
    props: { product: result || [] }
  };
};
export default ItemDetailViewPage;
