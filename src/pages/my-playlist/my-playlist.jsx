import { useThemeContext } from "../../components/context/theme-context";
import { GetTitleOfPlaylist } from "../../components/playlist/playlist";
import * as S from "../../components/playlist/playlist.styled";
import * as Styled from "../main-page/main-page.styled";

export const MyPlaylist = () => {
  const { theme } = useThemeContext();
  return (
    <>
      <Styled.MainCenterblockH2 theme={theme}>
        Мои треки
      </Styled.MainCenterblockH2>
      <S.CenterblockContent>
        <GetTitleOfPlaylist />
        <S.ContentPlaylist>Здесь будут мои треки</S.ContentPlaylist>
      </S.CenterblockContent>
    </>
  );
};
