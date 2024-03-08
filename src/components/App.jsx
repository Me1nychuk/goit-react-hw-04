import { useState, useMemo } from "react";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./ImageModal/ImageModal";
import { fetchImages } from "./api";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleSearch = async (word) => {
    setIsLoading(true);
    setQuery(word);

    try {
      const fetchedImages = await fetchImages(word);
      setImages(fetchedImages.results);
      setPage(1);
      setTotalPage(fetchedImages.total_pages);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchMore = async () => {
    setPage((prevState) => prevState + 1);
    try {
      const fetchedImages = await fetchImages(query, page + 1);
      setImages((prevState) => {
        return [...prevState, ...fetchedImages.results];
      });
    } catch (error) {
      setError(error);
    }
  };

  const handleOpenModal = (name, description, image) => {
    setModalData({ name, description, image });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const memoizedModalData = useMemo(
    () => ({
      name: modalData.name,
      image: modalData.image,
      description: modalData.description,
    }),
    [modalData]
  );

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} onClick={handleOpenModal} />
      )}
      {totalPage > page && <LoadMoreBtn onClick={handleSearchMore} />}

      <ImageModal
        data={memoizedModalData}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      />
    </>
  );
}

export default App;
