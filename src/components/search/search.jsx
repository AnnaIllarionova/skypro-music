// import { useThemeContext } from "../themes/theme-context";
import * as S from "./search.styled";

export function SearchComponent() {
  // const { theme } = useThemeContext();
  // console.log(theme);
  return (
    <S.CenterblockSearch>
      <S.SearchSvg>
        <use xlinkHref="img/icon/sprite.svg#icon-search"></use>
      </S.SearchSvg>
      <S.SearchText type="search" placeholder="Поиск" name="search" />
    </S.CenterblockSearch>
  );
}
