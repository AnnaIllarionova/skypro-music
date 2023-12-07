// import { useLocation } from "react-router-dom";
import { TrackListComponent } from "../../pages/main-page/main-page";
import { useGetAllTracksQuery } from "../../services/api-services";
// import { useEffect } from "react";
import * as S from "./playlist.styled";

export const AllTracksComponent = ({ isVisiable }) => {
//   const { path } = useLocation();
  const { data, error, isLoading } = useGetAllTracksQuery();

  const isEmptyList = !isLoading && (!data || data.length === 0);

//   useEffect(() => {
//     if (path === "/") {
//       refetch();
//     }
//   }, [refetch, error, isLoading, data]);
  if (isEmptyList) {
    return <p>Плейлист пуст</p>;
  }

  if (error) {
    return (
      <S.ErrorText>
        Не удалось загрузить плейлист: {error.message}
      </S.ErrorText>
    );
  }

  if (isLoading) {
    return <S.ErrorText>Загрузка...</S.ErrorText>;
  }

  return (
    <TrackListComponent
      isVisiable={isVisiable}
      title="Треки"
      showFilterTracks={true}
      trackList={data}
      error={error}
      isLoading={isLoading}
      isAllTracksLiked={false}
    />
  );
};
