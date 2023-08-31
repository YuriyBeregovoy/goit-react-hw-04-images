import { ImageStyle, ListItemStyle } from "./GalleryItem.styled"

export const ImageGalleryItem = ({ image: { id, webformatURL, tags, largeImageURL }, openModal }) => {
  return (<ListItemStyle>
  <ImageStyle id={id} src={webformatURL} alt={tags} onClick={() => openModal(largeImageURL)} />
</ListItemStyle>)

}