import * as React from "react";
import "./styles.scss";
import { categories, frCategories } from "../../data/categories";
import { ICategory } from "../../types";

export interface ILegendProps {
  isFrench: boolean;
  selectedCategory: string;
  onCategorySelected: (category: ICategory) => void;
}

export const Legend = ({
  isFrench,
  selectedCategory,
  onCategorySelected,
}: ILegendProps) => {
  const cats = isFrench ? frCategories : categories;
  return (
    <div className="legend">
      {cats.map((category) => {
        const className =
          selectedCategory === category.id
            ? `${category.id} icon selected`
            : `${category.id} icon`;
        const labelClassName =
          selectedCategory === category.id
            ? `${category.id} label selected`
            : `${category.id} label`;
        return (
          <div
            key={category.id}
            className="legend-item"
            onClick={() => onCategorySelected(category)}
          >
            <div className={className}></div>
            <div className={labelClassName}>{category.name}</div>
          </div>
        );
      })}
    </div>
  );
};
