import React from 'react';

type CategoriesPropsType = {
  value: number;
  onChahgeCategories: (id: number) => void;
};
export function Categories(props: CategoriesPropsType) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((title, index) => (
          <li
            key={index}
            onClick={() => {
              props.onChahgeCategories(index);
            }}
            className={props.value === index ? 'active' : ''}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
