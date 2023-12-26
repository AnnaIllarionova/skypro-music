import { useDispatch } from "react-redux";
import { TrackListComponent } from "../../pages/main-page/main-page";
import { useGetAllTracksQuery } from "../../services/api-services";
import * as S from "./playlist.styled";
import { setCurrentPage } from "../../store/slices/slices";
import { useEffect } from "react";

export const AllTracksComponent = ({ isVisiable, searchText }) => {
  const { data, error, isLoading } = useGetAllTracksQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage({ currentPage: "Главная" }));
  }, []);

  const isEmptyList = !isLoading && (!data || data.length === 0);

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
      searchText={searchText}
      isVisiable={isVisiable}
      trackList={data}
      isLoading={isLoading}
      isAllTracksLiked={false}
      error={error}
    />
  );
};
