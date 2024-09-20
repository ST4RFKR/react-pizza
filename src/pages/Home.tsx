import React from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock, PizzaBlockPropsType } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slice/filterSlice';
const Home = ({ searchValue }: any) => {
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const sortType = useSelector((state: any) => state.filter.sort.sortProp);
  const dispatch = useDispatch();

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const sortBy = sortType.replace('-', '');
  const orderBy = sortType.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  const onChahgeCategories = (id: number) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://66e3eaebd2405277ed125032.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}&order=${orderBy}`,
    )
      .then((res) => res.json())
      .then((item) => {
        setItems(item);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
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
        <Pagination
          currentPage={currentPage}
          onChangePage={(number: any) => setCurrentPage(number)}
        />
      </div>
    </>
  );
};

export default Home;
