import * as React from "react";
import { IElement } from "../../types";
import "./styles.scss";

export interface IElementCardProps {
  element: IElement;
  onClick: (element: IElement) => void;
  onHovered: (element: IElement | null) => void;
  onCategoryHovered: (category: string) => void;
}

export const ElementCard = ({
  element,
  onClick,
  onHovered,
  onCategoryHovered,
}: IElementCardProps) => {
  const { number, category, id, name, dates } = element;

  return (
    <div
      title="Click for more info"
      className={`element-card element-${number} ${category}`}
      onMouseEnter={() => {
        onCategoryHovered(category);
        onHovered(element);
      }}
      onMouseLeave={() => {
        onCategoryHovered("");
        onHovered(null);
      }}
      onClick={() => onClick(element)}
    >
      <div className="element-number">{number}</div>
      <div className="element-id">{id}</div>
      <div className="element-name">{name}</div>
      <div className="element-dates">{dates}</div>
    </div>
  );
};
