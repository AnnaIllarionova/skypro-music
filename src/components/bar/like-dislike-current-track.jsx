import * as S from "./bar.styled";

export function LikeOrDislikeCurrentTrack() {
  return (
    <S.TrackPlayLikeOrDislike>
      <S.TrackPlayLike>
        <S.TrackPlayLikeSvg alt="like">
          <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
        </S.TrackPlayLikeSvg>
      </S.TrackPlayLike>
      <S.TrackPlayDislike>
        <S.TrackPlayDislikeSvg alt="dislike">
          <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
        </S.TrackPlayDislikeSvg>
      </S.TrackPlayDislike>
    </S.TrackPlayLikeOrDislike>
  );
}
