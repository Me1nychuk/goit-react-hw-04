import ReactModal from "react-modal";
import PropTypes from "prop-types";
import css from "./ImageModal.module.css";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "90%",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    borderRadius: "8px",
  },
};
const ImageModal = ({ data, isOpen, onRequestClose }) => {
  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
      ariaHideApp={false}
    >
      <div className={css.modal}>
        <p>User: {data.name}</p>
        <p>Description: {data.description}</p>
        <img className={css.img} src={data.image}></img>
        <button type="button" onClick={onRequestClose}>
          Close
        </button>
      </div>
    </ReactModal>
  );
};

ImageModal.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default ImageModal;
