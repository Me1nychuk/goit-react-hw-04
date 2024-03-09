import { useState, useMemo, useEffect } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (page === 1) {
          const fetchedImages = await fetchImages(query);
          setImages(fetchedImages.results);
          setPage(1);
          setTotalPage(fetchedImages.total_pages);
          setError(null);
        } else {
          const fetchedImages = await fetchImages(query, page);
          setImages((prevState) => {
            return [...prevState, ...fetchedImages.results];
          });
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== "") {
      fetchData();
    }
  }, [query, page]);

  useEffect(() => {
    scrollToBottom();
  }, [images]);

  const handleSearch = (word) => {
    setQuery(word);
    setPage(1);
  };
  const handleAddImage = () => {
    setPage((prevState) => prevState + 1);
  };

  const handleOpenModal = (data) => {
    const image = data.urls.full;
    const description = data.alt_description;
    const name = data.user.name;

    setModalData({ image, description, name });
    setIsModalOpen(true);
  };
  function scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // Додає плавність до скролу
    });
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const memoizedModalData = useMemo(
    () => ({
      name: modalData.name || "",
      image: modalData.image || "",
      description: modalData.description || "",
    }),
    [modalData]
  );

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} onClick={handleOpenModal} />
      )}
      {totalPage > page && <LoadMoreBtn onClick={handleAddImage} />}
      {error && <ErrorMessage message={error.message} />}
      <ImageModal
        data={memoizedModalData}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      />
    </>
  );
}

export default App;
