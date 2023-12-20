
import * as S from "./bar.styled";

export function LikeOrDislikeCurrentTrack({isCurrentTrackLiked, changeLike}) {

  return (
    <S.TrackPlayLikeOrDislike>
      <S.TrackPlayLike onClick={() => changeLike()}>
        {isCurrentTrackLiked ? <S.TrackPlayLikeSvgActive alt="like">
          <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
        </S.TrackPlayLikeSvgActive> : <S.TrackPlayLikeSvg alt="like">
          <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
        </S.TrackPlayLikeSvg>}
      </S.TrackPlayLike>
      {/* <S.TrackPlayDislike>
        <S.TrackPlayDislikeSvg alt="dislike">
          <use xlinkHref="/img/icon/sprite.svg#icon-dislike"></use>
        </S.TrackPlayDislikeSvg>
      </S.TrackPlayDislike> */}
    </S.TrackPlayLikeOrDislike>
  );
}
