import PropTypes from "prop-types";
import css from "./ImageCard.module.css";

const ImageCard = ({ imageSmall, description, onClick }) => {
  return (
    <div className={css.wrapper} onClick={onClick}>
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

ImageCard.propTypes = {
  imageSmall: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
