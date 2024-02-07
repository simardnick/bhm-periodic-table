import { IElement } from "../../types";
import "./styles.scss";

export interface IElementInfoCardProps {
  element: IElement;
  isFrench: boolean;
  isMobile?: boolean;
  onClick?: (element: IElement) => void;
}

export const ElementInfoCard = ({
  element,
  isFrench,
  onClick,
  isMobile,
}: IElementInfoCardProps) => {
  const { number, category, id, name, dates } = element;
  return (
    <div
      className={`element-info-card`}
      onClick={() => onClick && onClick(element)}
    >
      {!isMobile ? (
        <img
          className="element-image"
          loading="eager"
          src={`./assets/${element.imageUrl}`}
          alt={element.name}
        />
      ) : (
        <div className={`element-box ${category}`}>
          <div className="number">{number}</div>
          <div className="id">{id}</div>
          <div className="name">{name}</div>
          <div className="dates">{dates}</div>
        </div>
      )}
      {element.infoBlurb ? (
        <div className="element-info">
          <div className="title">{name}</div>
          <div className="info-blurb">
            {element.infoBlurb.slice(0, 250)}... <i>{isFrench ? "(Cliquez pour voir plus d'informations)" :"(Click to see more info)"}</i>
          </div>
        </div>
      ) : (
        <div className="element-info">{name}</div>
      )}
    </div>
  );
};
