import React from 'react';

export function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((title, index) => (
          <li
            key={index}
            onClick={() => {
              setActiveIndex(index);
            }}
            className={activeIndex === index ? 'active' : ''}>
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
