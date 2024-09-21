import React from 'react';

import { Categories } from '../components/Categories';
import { selectItem, Sort } from '../components/Sort';
import { PizzaBlock, PizzaBlockPropsType } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilter } from '../redux/slice/filterSlice';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const Home = ({ searchValue }: any) => {
  const navigate = useNavigate();
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const sortType = useSelector((state: any) => state.filter.sort.sortProp);
  const currentPage = useSelector((state: any) => state.filter.currentPage);
  const dispatch = useDispatch();

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [currentPage, setCurrentPage] = React.useState(1);

  const sortBy = sortType.replace('-', '');
  const orderBy = sortType.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  const onChahgeCategories = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChahgePage = (num: number) => {
    dispatch(setCurrentPage(num));
  };
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = selectItem.find((obj: any) => obj.sortProp === params.sortType);
      dispatch(
        setFilter({
          ...params,
          sort,
        }),
      );
    }
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    // fetch(
    //   `https://66e3eaebd2405277ed125032.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}&order=${orderBy}`,
    // )
    //   .then((res) => res.json())
    //   .then((item) => {
    //     setItems(item);
    //     setIsLoading(false);
    //   });
    axios
      .get(
        `https://66e3eaebd2405277ed125032.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}&order=${orderBy}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);
  React.useEffect(() => {
    const queryString = qs.stringify({
      sortType,
      categoryId,
      currentPage,
    });
    navigate(`?${queryString}`);
    console.log(queryString);
  }, [categoryId, sortType, searchValue, currentPage]);
  const skeleton = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />);
  const pizzas = items.map((obj: PizzaBlockPropsType) => (
    <PizzaBlock
      key={obj.id}
      title={obj.title}
      price={obj.price}
      imageUrl={obj.imageUrl}
      sizes={obj.sizes}
      types={obj.types}
    />
  ));
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChahgeCategories={onChahgeCategories} />

        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {/* {items.map((obj: PizzaBlockPropsType) => (
              <PizzaBlock
                key={obj.id}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
              />
            ))} */}
        {isLoading ? skeleton : pizzas}
        <Pagination currentPage={currentPage} onChangePage={onChahgePage} />
      </div>
    </>
  );
};

export default Home;
