import ImageCard from "../ImageCard/ImageCard";
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
                imageLarge={el.urls.small}
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

export default ImageGallery;
