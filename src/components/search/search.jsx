import { useThemeContext } from "../context/theme-context";
import * as S from "./search.styled";

export function SearchComponent() {
  const { theme } = useThemeContext();
 
  return (
    <S.CenterblockSearch theme={theme}>
      <S.SearchSvg theme={theme}>
        <use xlinkHref={theme.iconSearch}></use>
      </S.SearchSvg>
      <S.SearchText theme={theme} type="search" placeholder="Поиск" name="search" />
    </S.CenterblockSearch>
  );
}
