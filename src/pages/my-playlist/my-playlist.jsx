import { useThemeContext } from "../../components/context/theme-context";
import {
  CreateOneTrack,
  GetTitleOfPlaylist,
} from "../../components/playlist/playlist";
import * as S from "../../components/playlist/playlist.styled";
import { useGetMyTracksQuery } from "../../services/api-services";
import * as Styled from "../main-page/main-page.styled";

export const MyPlaylist = ({ isVisiable }) => {
  const { theme } = useThemeContext();
  return (
    <>
      <Styled.MainCenterblockH2 theme={theme}>
        Мои треки
      </Styled.MainCenterblockH2>
      <S.CenterblockContent>
        <GetTitleOfPlaylist />
        <S.ContentPlaylist>
          <TracksOfMyPlaylist isVisiable={isVisiable} />
        </S.ContentPlaylist>
      </S.CenterblockContent>
    </>
  );
};

export function TracksOfMyPlaylist({ isVisiable }) {
  const { data: myTrackList, isLoading } = useGetMyTracksQuery();
  console.log("myTrackList", myTrackList);
  
  const isEmptyList = !isLoading && (!myTrackList || myTrackList.length === 0);
  if (isEmptyList) {
    return <p>Ваш плейлист пока пуст</p>;
  }

  const myTracks =
    myTrackList &&
    myTrackList.map((track) => (
      <CreateOneTrack key={track.id} isVisiable={isVisiable} track={track} />
    ));
  return <S.PlaylistItem>{myTracks}</S.PlaylistItem>;
}
