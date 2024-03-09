import PropTypes from "prop-types";
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

ImageCard.propTypes = {
  imageSmall: PropTypes.string.isRequired,
  imageLarge: PropTypes.string.isRequired,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
