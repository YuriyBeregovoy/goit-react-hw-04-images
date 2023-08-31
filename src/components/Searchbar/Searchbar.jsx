import { ButtonForm, InputStyle, SearchContainer, SearchForm } from "./Searchbar.styled"
import { FiSearch } from 'react-icons/fi';


export const Searchbar = ({onSubmit}) => {
  return (<SearchContainer>
    <SearchForm onSubmit={onSubmit}>
          <InputStyle type="text" name="query" placeholder="Search images..."/>
          <ButtonForm type="submit"><FiSearch/></ButtonForm>
        </SearchForm>
       </SearchContainer>
)

}