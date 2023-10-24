import { useRef, forwardRef, useState } from "react";
import * as S from "./bar.styled";
import { LikeOrDislikeCurrentTrack } from "./like-dislike-current-track";
import { CorrectVolume, PlayerControls } from "./player-controls";
import { TrackTimeText } from "../playlist/playlist.styled";

export const MusicBar = ({ chosenTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const handlePlay = () => {
    audioRef.current.play();
    setIsPlaying(true);
    console.log(audioRef.current.duration);
    console.log(audioRef.current.currentTime);
  };
  const handlePause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  const togglePlay = !isPlaying ? handlePlay : handlePause;
  console.log(isPlaying);

  const [isLooped, setIsLooped] = useState(false);

  const handleLoop = () => {
    audioRef.current.loop = true;
    setIsLooped(true);
    console.log("lopped");
  };

  const handleCancelLoop = () => {
    audioRef.current.loop = false;
    setIsLooped(false);
    console.log("cancel loop");
  };

  const toggleLoop = !isLooped ? handleLoop : handleCancelLoop;

  return (
    <S.Bar>
      <S.BarContent>
        <TrackTimeText>
        {/* {audioRef.current.currentTime} / {Math.round((audioRef.current.duration))} */}
        </TrackTimeText>
        <AudioPlayer ref={audioRef} chosenTrack={chosenTrack} />
        <S.BarPlayerProgress></S.BarPlayerProgress>
        <S.BarPlayerBlock>
          <S.BarPlayer>
            <PlayerControls
              togglePlay={togglePlay}
              isPlaying={isPlaying}
              isLooped={isLooped}
              toggleLoop={toggleLoop}
            />
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
  return <audio style={{display: "none"}} ref={ref} src={chosenTrack.track_file} controls loop></audio>;
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
