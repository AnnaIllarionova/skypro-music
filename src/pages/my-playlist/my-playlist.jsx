import { useGetMyTracksQuery } from "../../services/api-services";
import { TrackListComponent } from "../main-page/main-page";
import * as S from "../../components/playlist/playlist.styled";
// import { useEffect } from "react";

export const MyPlaylist = ({ isVisiable }) => {

  const { data, error, isLoading } = useGetMyTracksQuery();

  const isEmptyList = !isLoading && (!data || data.length === 0);
  if (isEmptyList) {
    return <p>Ваш плейлист пока пуст</p>;
  }

  if (error) {
    return (
      <S.ErrorText>Не удалось загрузить плейлист: {error.message}</S.ErrorText>
    );
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
      error={error}
      isLoading={isLoading}
      isAllTracksLiked={true}
    />
  );
};
