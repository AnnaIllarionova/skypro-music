import { useEffect, useRef, useState } from "react";
import * as S from "./bar.styled";
import { LikeOrDislikeCurrentTrack } from "./like-dislike-current-track";
import { CorrectVolume, PlayerControls } from "./player-controls";
import { TrackTimeText } from "../playlist/playlist.styled";

export const MusicBar = ({ chosenTrack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    audioRef.current.volume = 0.3;
    setVolume(audioRef.current.volume);

    const handleTimeUpdateEvent = () => {
      if (audioRef.current.currentTime && audioRef.current.duration) {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      } else {
        setCurrentTime(0);
        setDuration(0);
      }
    };
    audioRef.current.addEventListener("timeupdate", handleTimeUpdateEvent);
    return () =>
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdateEvent);
  }, []);

  const changeVolume = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const changeCurrentTime = (event) => {
    const newCurrentTime = event.target.value;
    audioRef.current.currentTime = newCurrentTime;
    play();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const reminingSeconds = Math.floor(seconds % 60);
    const formatedSeconds =
      reminingSeconds < 10 ? "0" + reminingSeconds : reminingSeconds;
    return minutes + "." + formatedSeconds;
  };

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };
  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  useEffect(() => {
    if (chosenTrack) {
      play();
    } else {
      pause();
    }
  }, [chosenTrack]);

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
          {formatTime(currentTime)} / {formatTime(duration)}
        </TrackTimeText>
        <audio ref={audioRef} src={chosenTrack.track_file} loop></audio>
        <S.BarPlayerProgress
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={changeCurrentTime}
          $color="#ff0000"
        ></S.BarPlayerProgress>
        <S.BarPlayerBlock>
          <S.BarPlayer>
            <PlayerControls
              togglePlay={togglePlay}
              isPlaying={isPlaying}
              isLooped={isLooped}
              toggleLoop={toggleLoop}
            />
            <S.PlayerTrackPlay>
              <SeeCurrentTrack chosenTrack={chosenTrack} onClick={togglePlay} />
              <LikeOrDislikeCurrentTrack />
            </S.PlayerTrackPlay>
          </S.BarPlayer>
          <CorrectVolume volume={volume} changeVolume={changeVolume} />
        </S.BarPlayerBlock>
      </S.BarContent>
    </S.Bar>
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
