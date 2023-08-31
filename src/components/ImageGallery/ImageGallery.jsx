import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import { GalleryStyle } from "./ImageGallery.styled"

export const ImageGallery = ({imagesArea, openModal}) => {

  return (<GalleryStyle>{imagesArea.map(image => (
    <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
  ))}</GalleryStyle>)

}