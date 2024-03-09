import ImageCard from "../ImageCard/ImageCard";
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, onClick }) => {
  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {images.map((el) => {
          return (
            <li key={el.id} className={css}>
              <ImageCard
                imageSmall={el.urls.small}
                imageLarge={el.urls.full}
                description={el.alt_description}
                name={el.user.name}
                onClick={onClick}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      urls: PropTypes.shape({
        small: PropTypes.string.isRequired,
        full: PropTypes.string.isRequired,
      }).isRequired,
      alt_description: PropTypes.string,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
