import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ProtectedRoute } from '../../utils/ProtectedRoute';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { productsType } from '../../types/constants/products.type';
import { categoryLists } from '../../data/categoryLists';
import { productLists } from '../../data/productLists';
import { brandLists } from '../../data/brandLists';
import { genderLists } from '../../data/genderLists';
import FilterComponent from './FilterComponent';
import ProductCatelog from './ProductCatelog';

interface categoryDetailsProps {
  products: productsType[];
}
const CategroyDetails: FC<categoryDetailsProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const themes = useTheme();
  const matches = useMediaQuery(themes.breakpoints.up('md'));
  if (matches && isOpen) setIsOpen(false);
  const [brandFilter, setBrandFilter] = useState<number[]>([]);
  const [sizeFilter, setSizeFilter] = useState<number[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<number[]>([]);
  const [priceFilter, setPriceFilter] = useState<[number, number]>([400, 500]);
  const [selectedGender, setSelectedGender] = useState<number>();
  const [selectedType, setSelectedType] = useState<string>('');
  const [filterCategoryData, setFilterCategoryData] = useState<productsType[]>([]);
  const [page, setPage] = useState<number>(1);
  const PER_PAGE = 9;
  const count = Math.ceil(filterCategoryData.length / PER_PAGE);
  const indexOfLastRecord = page * PER_PAGE;
  const indexOfFirstRecord = indexOfLastRecord - PER_PAGE;
  const router = useRouter();

  useEffect(() => {
    let curRoute = router.asPath;
    let genderValue = curRoute.split('/')[1];
    let object = genderLists.find(gender => gender.slug === genderValue);
    if (object) setSelectedGender(object.id);
    let brandOrCategoryType = curRoute.split('/')[3];
    if (brandOrCategoryType) setSelectedType(brandOrCategoryType);
    let brandOrCategoryValue = curRoute.split('/')[4];
    if (brandOrCategoryType === 'category' && brandOrCategoryValue && categoryLists) {
      let object = categoryLists.find(category => category.slug === brandOrCategoryValue);
      if (object) setCategoryFilter([object.id]);
    }
    if (brandOrCategoryType === 'brand' && brandOrCategoryValue && brandLists) {
      let object = brandLists.find(brand => brand.slug === brandOrCategoryValue);
      if (object) setBrandFilter([object.id]);
    }
    if (products.length > 0) {
      let minPrice = Math.min(...products.map(product => product.productCurrentPrice));
      let maxPrice = Math.max(...products.map(product => product.productCurrentPrice));
      setPriceFilter([minPrice, maxPrice]);
    }
  }, [products, router.asPath]);

  useEffect(() => {
    if (brandFilter || sizeFilter || categoryFilter || priceFilter) {
      const newProductList = productLists.filter(product => {
        if (
          (brandFilter.includes(product.brand) || categoryFilter.includes(product.category)) &&
          product.gender === selectedGender &&
          product.productCurrentPrice >= priceFilter[0] &&
          product.productCurrentPrice <= priceFilter[1]
        ) {
          return product;
        }
      });
      const list = productLists.filter(product => {
        if (product.gender === selectedGender) {
          return product.size.find(size => sizeFilter.includes(size));
        }
      });
      let newFilterPRoductLists = [...newProductList, ...list].filter(
        (product, ind, lists) => ind === lists.findIndex(productId => productId.id === product.id)
      );
      setFilterCategoryData(newFilterPRoductLists);
    }
  }, [brandFilter, sizeFilter, categoryFilter, priceFilter, selectedGender]);
  useEffect(() => {
    setPage(1);
  }, [filterCategoryData]);

  const handleProductClick = (productDetail: productsType) => {
    setIsOpen(!isOpen);
    router.replace(
      {
        pathname: `/product/${productDetail.slug}`,
        query: { productId: productDetail.id }
      }
      // `/product/${productDetail.slug}`
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = parseInt(e.target.value);
    if (name === 'brand') {
      if (brandFilter[0] !== value && !brandFilter.includes(value)) {
        setBrandFilter([...brandFilter, value]);
      } else {
        if (selectedType === 'brand' && brandFilter[0] !== value) {
          let newBrandFilter = brandFilter.filter(brand => brand !== value);
          setBrandFilter(newBrandFilter);
        } else if (selectedType !== 'brand' && brandFilter[0] === value) {
          let newBrandFilter = brandFilter.filter(brand => brand !== value);
          setBrandFilter(newBrandFilter);
        }
      }
    }
    if (name === 'category') {
      if (categoryFilter[0] !== value && !categoryFilter.includes(value)) {
        setCategoryFilter([...categoryFilter, value]);
      } else {
        if (selectedType === 'category' && categoryFilter[0] !== value) {
          let newCategoryFilter = categoryFilter.filter(category => category !== value);
          setCategoryFilter(newCategoryFilter);
        } else if (selectedType !== 'category' && categoryFilter[0] === value) {
          let newCategoryFilter = categoryFilter.filter(category => category !== value);
          setCategoryFilter(newCategoryFilter);
        }
      }
    }
    if (name === 'size') {
      if (!sizeFilter.includes(value)) {
        setSizeFilter([...sizeFilter, value]);
      } else {
        let newSizeFilter = sizeFilter.filter(size => size !== value);
        setSizeFilter(newSizeFilter);
      }
    }
  };

  const handleChangePagination = () => {
    if (page !== count) setPage(page + 1);
    if (page !== 1) setPage(page - 1);
  };
  return (
    <ProtectedRoute>
      <Box
        sx={{
          marginTop: { xs: '0', md: '150px' }
        }}>
        <Navbar />
        <Box
          sx={{
            padding: {
              xl: '0 290px',
              md: '0 140px',
              sm: '0 40px',
              xs: '0 30px'
            },
            display: 'flex',
            gap: '60px'
          }}>
          <FilterComponent
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleChange={handleChange}
            priceFilter={priceFilter}
            setPriceFilter={setPriceFilter}
            sizeFilter={sizeFilter}
            categoryFilter={categoryFilter}
            brandFilter={brandFilter}
          />
          <ProductCatelog
            count={count}
            handleChangePagination={handleChangePagination}
            page={page}
            filterCategoryData={filterCategoryData}
            handleProductClick={productDetail => handleProductClick(productDetail)}
            indexOfLastRecord={indexOfLastRecord}
            indexOfFirstRecord={indexOfFirstRecord}
          />
        </Box>
      </Box>
    </ProtectedRoute>
  );
};
export default CategroyDetails;
