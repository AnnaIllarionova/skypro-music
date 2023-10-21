import { useRef, forwardRef, useState } from "react";
import * as S from "./bar.styled";
import { LikeOrDislikeCurrentTrack } from "./like-dislike-current-track";
import { CorrectVolume, PlayerControls } from "./player-controls";

export const MusicBar = ({ chosenTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  const togglePlay = !isPlaying ? handlePlay : handlePause;
  console.log(isPlaying);
  return (
    <S.Bar>
      <S.BarContent>
        <AudioPlayer ref={audioRef} chosenTrack={chosenTrack} />
        <S.BarPlayerProgress></S.BarPlayerProgress>
        <S.BarPlayerBlock>
          <S.BarPlayer>
            <PlayerControls togglePlay={togglePlay} isPlaying={isPlaying} />
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

const AudioPlayer = forwardRef(({ chosenTrack }, ref) => {
  console.log(ref);
  return <audio ref={ref} src={chosenTrack.track_file} controls></audio>;
});
AudioPlayer.displayName = AudioPlayer;

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
