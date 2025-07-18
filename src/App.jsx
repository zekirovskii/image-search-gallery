import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

import { fetchImages } from "./utils/unsplashAPI";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
  try {
    setIsLoading(true);
    setError(null);
    const startTime = Date.now();
    const data = await fetchImages(query, page);
    
    const elapsed = Date.now() - startTime;
    const minLoadingTime = 300; 

    if (elapsed < minLoadingTime) {
      await new Promise((resolve) => setTimeout(resolve, minLoadingTime - elapsed));
    }

    setImages((prev) => (page === 1 ? data.results : [...prev, ...data.results]));
  } catch (err) {
    setError("An error occurred while fetching images.");
  } finally {
    setIsLoading(false);
  }
};


    loadImages();
  }, [query, page]);

  useEffect(() => {
  if (page > 1 && images.length > 0) {
    window.scrollBy({
      top: 700, 
      behavior: "smooth",
    });
  }
}, [images]);


  const handleSearch = (newQuery) => {
    if (newQuery === query) return;
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      {!isLoading && images.length > 0 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        image={selectedImage}
      />
    </div>
  );
}
