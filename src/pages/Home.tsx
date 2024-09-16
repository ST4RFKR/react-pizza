import React from 'react';

import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock, PizzaBlockPropsType } from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

const Home = ({ searchValue }: any) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);

  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProp: 'rating',
  });
  const sortBy = sortType.sortProp.replace('-', '');
  const orderBy = sortType.sortProp.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';
  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://66e3eaebd2405277ed125032.mockapi.io/items?${category}&sortBy=${sortBy}${search}&order=${orderBy}`,
    )
      .then((res) => res.json())
      .then((item) => {
        console.log(item);
        setItems(item);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

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
        <Categories value={categoryId} onChahgeCategories={(id) => setCategoryId(id)} />

        <Sort
          value={sortType}
          onChahgeSort={(obj) => {
            setSortType(obj);
          }}
        />
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
      </div>
    </>
  );
};

export default Home;
