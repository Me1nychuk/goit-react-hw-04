import css from "./ImageCard.module.css";

const ImageCard = ({ imageSmall, imageLarge, description, name, onClick }) => {
  return (
    <div
      className={css.wrapper}
      onClick={() => onClick(name, description, imageLarge)}
    >
      <img
        className={css.img}
        width="400px"
        height="300px"
        src={imageSmall}
        alt={description}
      />
    </div>
  );
};

export default ImageCard;
