import { useState } from "react";
import * as S from "./bar.styled";

export function MusicBar() {
  return (
    <S.Bar>
      <S.BarContent>
        <S.BarPlayerProgress></S.BarPlayerProgress>
        <S.BarPlayerBlock>
          <S.BarPlayer>
            <PlayerControls />
            <S.PlayerTrackPlay>
              <SeeCurrentTrack />
              <LikeOrDislikeCurrentTrack />
            </S.PlayerTrackPlay>
          </S.BarPlayer>
          <CorrectVolume />
        </S.BarPlayerBlock>
      </S.BarContent>
    </S.Bar>
  );
}

function PlayerControls() {
  return (
    <S.PlayerControlsItems>
      <S.PlayerBtnPrev>
        <S.PlayerBtnPrevSvg alt="prev">
          <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
        </S.PlayerBtnPrevSvg>
      </S.PlayerBtnPrev>
      <S.PlayerBtnPlay className="player__btn-play _btn">
        <S.PlayerBtnPlaySvg alt="play">
          <use xlinkHref="img/icon/sprite.svg#icon-play"></use>
        </S.PlayerBtnPlaySvg>
      </S.PlayerBtnPlay>
      <S.PlayerBtnNext>
        <S.PlayerBtnNextSvg alt="next">
          <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
        </S.PlayerBtnNextSvg>
      </S.PlayerBtnNext>
      <S.PlayerBtnRepeat className="player__btn-repeat _btn-icon">
        <S.PlayerBtnRepeatSvg alt="repeat">
          <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
        </S.PlayerBtnRepeatSvg>
      </S.PlayerBtnRepeat>
      <S.PlayerBtnShuffle className="player__btn-shuffle _btn-icon">
        <S.PlayerBtnShuffleSvg alt="shuffle">
          <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
        </S.PlayerBtnShuffleSvg>
      </S.PlayerBtnShuffle>
    </S.PlayerControlsItems>
  );
}

function LikeOrDislikeCurrentTrack() {
  return (
    <S.TrackPlayLikeOrDislike>
      <S.TrackPlayLike className="_btn-icon">
        <S.TrackPlayLikeSvg alt="like">
          <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
        </S.TrackPlayLikeSvg>
      </S.TrackPlayLike>
      <S.TrackPlayDislike className="_btn-icon">
        <S.TrackPlayDislikeSvg alt="dislike">
          <use xlinkHref="img/icon/sprite.svg#icon-dislike"></use>
        </S.TrackPlayDislikeSvg>
      </S.TrackPlayDislike>
    </S.TrackPlayLikeOrDislike>
  );
}

function SeeCurrentTrack() {
  const [isVisiable, setIsVisiable] = useState(false);
  setTimeout(() => {
    setIsVisiable(true);
  }, 3000);
  return (
    <S.TrackPlayContain>
      <S.TrackPlayImage>
        {isVisiable && (
          <S.TrackPlaySvg alt="music">
            <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
          </S.TrackPlaySvg>
        )}
      </S.TrackPlayImage>
      <S.TrackPlayAuthor isVisiable={!isVisiable}>
        {isVisiable && (
          <S.TrackPlayAuthorLink href="http://">Ты та...</S.TrackPlayAuthorLink>
        )}
      </S.TrackPlayAuthor>
      <S.TrackPlayAlbum isVisiable={!isVisiable}>
        {isVisiable && (
          <S.TrackPlayAlbumLink href="http://">Баста</S.TrackPlayAlbumLink>
        )}
      </S.TrackPlayAlbum>
    </S.TrackPlayContain>
  );
}

function CorrectVolume() {
  return (
    <S.BarVolumeBlock className="volume">
      <S.VolumeContent>
        <S.VolumeImage>
          <S.VolumeSvg alt="volume">
            <use xlinkHref="img/icon/sprite.svg#icon-volume"></use>
          </S.VolumeSvg>
        </S.VolumeImage>
        <S.VolumeProgress className="_btn">
          <S.VolumeProgressLine className="_btn" type="range" name="range" />
        </S.VolumeProgress>
      </S.VolumeContent>
    </S.BarVolumeBlock>
  );
}
