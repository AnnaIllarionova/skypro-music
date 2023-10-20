import * as S from "./bar.styled";
import { LikeOrDislikeCurrentTrack } from "./like-dislike-current-track";
import { CorrectVolume, PlayerControls } from "./player-controls";

export const MusicBar = ({ chosenTrack }) => {
  return (
    <S.Bar>
      <S.BarContent>
        <AudioPlayer chosenTrack={chosenTrack} />
        <S.BarPlayerProgress></S.BarPlayerProgress>
        <S.BarPlayerBlock>
          <S.BarPlayer>
            <PlayerControls />
            <S.PlayerTrackPlay>
              <SeeCurrentTrack chosenTrack={chosenTrack} />
              <LikeOrDislikeCurrentTrack />
            </S.PlayerTrackPlay>
          </S.BarPlayer>
          <CorrectVolume />
        </S.BarPlayerBlock>
      </S.BarContent>
    </S.Bar>
  );
};

const AudioPlayer = ({ chosenTrack }) => {
  return (
    <>
      <audio src={chosenTrack.track_file} controls></audio>
    </>
  );
};

const SeeCurrentTrack = ({ chosenTrack }) => {
  return (
    <S.TrackPlayContain>
      <S.TrackPlayImage>
        <S.TrackPlaySvg alt="music">
          <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
        </S.TrackPlaySvg>
      </S.TrackPlayImage>
      <S.TrackPlayAuthor>
        <S.TrackPlayAuthorLink href="http://">
          {chosenTrack.name}
        </S.TrackPlayAuthorLink>
      </S.TrackPlayAuthor>
      <S.TrackPlayAlbum>
        <S.TrackPlayAlbumLink href="http://">
          {chosenTrack.author}
        </S.TrackPlayAlbumLink>
      </S.TrackPlayAlbum>
    </S.TrackPlayContain>
  );
};
