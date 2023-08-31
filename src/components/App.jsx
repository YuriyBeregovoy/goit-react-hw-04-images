import { fetchImages } from "api";
import { useEffect, useState } from "react";
import Notiflix from 'notiflix';
import { InfinitySpin } from 'react-loader-spinner'
import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css';

import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { LoadMoreButton } from "./Button/LoadMoreButton";
import { Layout } from "./Layout";

export const App = () => {
  const [query, setQuery] = useState("");
  const [imagesGallery, setImagesGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [hasImages, setHasImages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const changeQuery = (newQuery) => {
    if (newQuery !== "") {
      setQuery(`${Date.now()}/${newQuery}`);
      setImagesGallery([]);
      setPage(1);
    }
  };

  useEffect(() => {
    if (query) {
      const fetchAndSetImages = async () => {
       
        const indexOfSlash = query.indexOf("/");
        const queryAfterSlash = query.slice(indexOfSlash + 1);

    
        try {
          setIsLoading(true);

          const newImages = await fetchImages(queryAfterSlash, page);
          if (newImages.length === 0) {
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
          }
    
          setImagesGallery([...imagesGallery, ...newImages]);
          setHasImages(newImages.length > 0);
   

        } catch (error) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchAndSetImages();
}
    
  }, [query, page]);

 


 const handleLoadMore = () => setPage(prevPage => prevPage + 1);
  
const openModal = (imageUrl) => {
  const instance = basicLightbox.create(`<img src="${imageUrl}" width="800" height="600">`);
  instance.show();
};



 
  return (
    <div>
       <Searchbar onSubmit={evt => {
        evt.preventDefault();
        const searchQuery = evt.target.elements.query.value.trim();
        if (searchQuery) { changeQuery(searchQuery); } else {
          Notiflix.Notify.failure('Please enter a valid search query.');
        }
        evt.target.reset();
      }} />
      <Layout>
        {imagesGallery.length > 0 && <ImageGallery
          imagesArea={imagesGallery}
          openModal={openModal} />}
        {isLoading && <InfinitySpin width='100' color="#4fa94d" />}
        {hasImages && (<LoadMoreButton onClick={handleLoadMore} />)}
      </Layout>
    </div>
  );
};

 
