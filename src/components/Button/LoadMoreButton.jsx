import { BtnLoadMore } from "./LoadMoreButton.styled";

export const LoadMoreButton = ({onClick}) => {
  return (<BtnLoadMore type="button" onClick={onClick}>Load more</BtnLoadMore>);
}