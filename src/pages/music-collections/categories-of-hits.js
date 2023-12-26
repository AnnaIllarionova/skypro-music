import { useParams } from "react-router-dom";
import { categories } from "../../components/sidebar/categories";
import { useGetSelectionByIdQuery } from "../../services/api-services";
import { TrackListComponent } from "../main-page/main-page";
import * as S from "../../components/playlist/playlist.styled";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../../store/slices/slices";
import { useEffect } from "react";

export const CategoriesOfHits = ({ setTitle, searchText }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const selectionId = parseInt(params.id);
  const category = categories.find((category) => category.id === selectionId);

  useEffect(() => {
    setTitle(category.selection_title);
    dispatch(setCurrentPage({ currentPage: "Подборки" }));
  }, []);
  

  const { data, error, isLoading } = useGetSelectionByIdQuery({
    id: selectionId,
  });

  const isEmptyList = !isLoading && (!data || data.length === 0);
  if (isEmptyList) {
    return <p>Ваш плейлист пока пуст</p>;
  }

  if (isLoading) {
    return <S.ErrorText>Загрузка...</S.ErrorText>;
  }

  

  return (
    <TrackListComponent
      searchText={searchText}
      isVisiable={true}
      trackList={data.items}
      error={error}
      isLoading={isLoading}
      isAllTracksLiked={false}
    />
  );
};
