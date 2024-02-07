import { Button, IconButton } from "@material-ui/core";
import * as React from "react";
import { jsonData } from "../../data/element-json";
import { IElement } from "../../types";
import { categories, frCategories } from "../../data/categories";
import { ElementCard } from "../element-card";
import "./styles.scss";
import { MobilePopoverCard } from "../mobile-popover-card";
import CloseIcon from "@material-ui/icons/Close";

export interface ICategoryTableProps {
  showTableView: () => void;
  isFrench: boolean;
}

export const CategoryTable = ({
  showTableView,
  isFrench,
}: ICategoryTableProps) => {
  const [open, setOpen] = React.useState<IElement | null>(null);
  const elData: { [categoryName: string]: IElement[] } = {};
  const onElementClicked = (element: IElement) => {
    setOpen(element);
  };
  const onMoreInfoClicked = (element: IElement | null) => {
    if (element) {
      window.open(element.urlLink, "_blank");
    }
  };
  const cats = isFrench ? categories : frCategories;
  const dataToDisplay = isFrench ? jsonData : jsonData;
  cats.map((cat) => (elData[cat.id] = []));
  dataToDisplay.forEach((data) => {
    elData[data.category].push(data);
  });
  return (
    <div className="bhm-category-table">
      <Button className="show-table-button" onClick={() => showTableView()}>
        {isFrench ? "Voir Comme Tableau" : "Show Table View"}
      </Button>
      {categories.map((cat) => (
        <div key={cat.id}>
          <h1 key={cat.id}>{cat.name}</h1>
          {elData[cat.id].map((data) => (
            <div
              className="category-element"
              onClick={() => onElementClicked(data)}
              key={data.number}
            >
              <ElementCard
                element={data}
                onHovered={() => {}}
                onCategoryHovered={() => {}}
                onClick={() => {}}
              ></ElementCard>
              <div className="category-element-info">
                <h2 className="category-element-name">{data.name}</h2>
                <h3 className="category-element-dates">{data.dates}</h3>
              </div>
              {/* <img
                className="category-element-image"
                src={`./assets/${data.imageUrl}`}
                alt={data.name}
              /> */}
            </div>
          ))}
        </div>
      ))}
      <MobilePopoverCard
        open={!!open}
        className="mobile-element-info-popup"
        contentClassName="mobile-element-info-popup-container"
        onClose={() => setOpen(null)}
        topRightButton={
          <IconButton
            aria-label="close"
            className="close-button"
            size="small"
            onClick={() => setOpen(null)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <div className="element-info-popup">
          <img
            className="category-element-image"
            src={`./assets/${open?.imageUrl}`}
            alt={open?.name}
          />
          <div className="info-blurb">{open?.infoBlurb}</div>
          <div
            className="learn-more-button"
            onClick={() => onMoreInfoClicked(open)}
          >
            {isFrench ? "Savoir Plus" : "Learn More"}
          </div>
        </div>
      </MobilePopoverCard>
    </div>
  );
};
