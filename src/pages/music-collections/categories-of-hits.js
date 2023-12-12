import { useParams } from "react-router-dom";
import { categories } from "../../components/sidebar/categories";
import { useGetSelectionByIdQuery } from "../../services/api-services";
import { TrackListComponent } from "../main-page/main-page";
import * as S from "../../components/playlist/playlist.styled";

export const CategoriesOfHits = ({ setTitle }) => {
  const params = useParams();
  const selectionId = parseInt(params.id);
  console.log("-->", params);
  console.log(typeof selectionId);
  console.log(selectionId);
  const category = categories.find((category) => category.id === selectionId);
  console.log(category);

  setTitle(category.selection_title);

  const { data, error, isLoading } = useGetSelectionByIdQuery({
    id: selectionId,
  });
  console.log(data);

  const isEmptyList = !isLoading && (!data || data.length === 0);
  if (isEmptyList) {
    return <p>Ваш плейлист пока пуст</p>;
  }

  if (isLoading) {
    return <S.ErrorText>Загрузка...</S.ErrorText>;
  }

  return (
    <TrackListComponent
      isVisiable={true}
      trackList={data.items}
      error={error}
      isLoading={isLoading}
      isAllTracksLiked={false}
    />
  );
};
