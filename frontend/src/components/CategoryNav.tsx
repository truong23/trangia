import React from 'react';
import { Category } from '../types';

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="category-tabs">
      <button
        className={`cat-tab ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => onSelectCategory('all')}
      >
        Tất cả tin tức
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`cat-tab ${selectedCategory === cat.slug ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat.slug)}
        >
          <span>{cat.name}</span>
          {cat.articleCount !== undefined && (
            <span className="cat-count">{cat.articleCount}</span>
          )}
        </button>
      ))}
    </div>
  );
};
