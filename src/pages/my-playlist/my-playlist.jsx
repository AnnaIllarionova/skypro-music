import { useGetMyTracksQuery } from "../../services/api-services";
import { TrackListComponent } from "../main-page/main-page";
import * as S from "../../components/playlist/playlist.styled";
import { CurrentUserContext } from "../../routes";
import { useContext } from "react";

export const MyPlaylist = ({ isVisiable }) => {
  const { data, error, isLoading } = useGetMyTracksQuery();
  const { handleLogout } = useContext(CurrentUserContext);
  
  const isEmptyList = !isLoading && (!data || data.length === 0);
  if (isEmptyList) {
    return <p>Ваш плейлист пока пуст</p>;
  }

  if (error) {
    if (error.status === 401) {
      handleLogout();
    }
  }

  if (isLoading) {
    return <S.ErrorText>Загрузка...</S.ErrorText>;
  }

  return (
    <TrackListComponent
      isVisiable={isVisiable}
      title="Мои треки"
      showFilterTracks={false}
      trackList={data}
      // error={error}
      isLoading={isLoading}
      isAllTracksLiked={true}
    />
  );
};
