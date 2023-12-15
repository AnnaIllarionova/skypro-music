import { useThemeContext } from "../context/theme-context";
import * as S from "./search.styled";

export function SearchComponent({setSearchText}) {
  const { theme } = useThemeContext();

  const handleSearchText = (searchValue) => {
    setSearchText(searchValue);
  };

  return (
    <S.CenterblockSearch theme={theme}>
      <S.SearchSvg theme={theme}>
        <use xlinkHref={theme.iconSearch}></use>
      </S.SearchSvg>
      <S.SearchText
        theme={theme}
        type="search"
        placeholder="Поиск"
        name="search"
        onChange={(e) => handleSearchText(e.target.value)}
      />
    </S.CenterblockSearch>
  );
}
