import { TrackListComponent } from "../../pages/main-page/main-page";
import { useGetAllTracksQuery } from "../../services/api-services";
// import { useEffect } from "react";
import * as S from "./playlist.styled";

export const AllTracksComponent = ({ isVisiable }) => {
  const { data, error, isLoading } = useGetAllTracksQuery();
  console.log(data);
  const isEmptyList = !isLoading && (!data || data.length === 0);

  // useEffect(() => {
  //   const updateData = async () => {
  //     try {
  //       await refetch();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   updateData();
  //   return () => {
  //     updateData();
  //   };
  // }, [refetch]);

  if (isEmptyList) {
    return <p>Плейлист пуст</p>;
  }

  if (error) {
    console.log(error);

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
      title="Треки"
      showFilterTracks={true}
      trackList={data}
      //   error={error}
      isLoading={isLoading}
      isAllTracksLiked={false}
    />
  );
};
