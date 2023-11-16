import { useEffect, useRef, useState } from "react";
import * as S from "./bar.styled";
import { LikeOrDislikeCurrentTrack } from "./like-dislike-current-track";
import { CorrectVolume, PlayerControls } from "./player-controls";
import { TrackTimeText } from "../playlist/playlist.styled";
import { formatTime } from "../formated-time/formated-time";
import { useThemeContext } from "../context/theme-context";

export const MusicBar = ({ chosenTrack }) => {
  const { theme } = useThemeContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooped, setIsLooped] = useState(false);

  const handleMute = () => {
    audioRef.current.muted = true;
    setIsMuted(true);
    console.log("muted");
  };
  const handleCancelMute = () => {
    audioRef.current.muted = false;
    setIsMuted(false);
    console.log("cancel mute");
  };

  const toggleMute = isMuted ? handleCancelMute : handleMute;

  useEffect(() => {
    const audioElement = audioRef.current;
    audioElement.volume = 0.3;
    setVolume(audioElement.volume);

    const handleTimeUpdateEvent = () => {
      if (audioElement.currentTime && audioElement.duration) {
        setCurrentTime(audioElement.currentTime);
        setDuration(audioElement.duration);
      } else {
        setCurrentTime(0);
        setDuration(0);
      }
    };
    const timeEnded = () => {
      if (!isLooped) {
        pause();
      }
    };
    audioElement.addEventListener("ended", timeEnded);
    audioElement.addEventListener("timeupdate", handleTimeUpdateEvent);
    return () => {
      audioElement.removeEventListener("ended", timeEnded);
      audioElement.removeEventListener("timeupdate", handleTimeUpdateEvent);
    };
  }, [isLooped]);

  const changeVolume = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const changeCurrentTime = (event) => {
    const newCurrentTime = event.target.value;
    audioRef.current.currentTime = newCurrentTime;
    if (isPlaying) {
      play();
    } else {
      pause();
    }
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
    <S.Bar theme={theme}>
      <S.BarContent>
        <TrackTimeText>
          {formatTime(currentTime)} / {formatTime(duration)}
        </TrackTimeText>
        <audio ref={audioRef} src={chosenTrack.track_file} loop={false}></audio>
        <S.BarPlayerProgress
        theme={theme}
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={changeCurrentTime}
          // $color="#ff0000"
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
              <SeeCurrentTrack
                theme={theme}
                chosenTrack={chosenTrack}
                onClick={togglePlay}
              />
              <LikeOrDislikeCurrentTrack />
            </S.PlayerTrackPlay>
          </S.BarPlayer>
          <CorrectVolume
            volume={volume}
            changeVolume={changeVolume}
            toggleMute={toggleMute}
            isMuted={isMuted}
          />
        </S.BarPlayerBlock>
      </S.BarContent>
    </S.Bar>
  );
};

const SeeCurrentTrack = ({ chosenTrack, theme }) => {
  return (
    <S.TrackPlayContain>
      <S.TrackPlayImage theme={theme}>
        <S.TrackPlaySvg alt="music">
          <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
        </S.TrackPlaySvg>
      </S.TrackPlayImage>
      <S.TrackPlayAuthor>
        <S.TrackPlayAuthorLink theme={theme} href="http://">
          {chosenTrack.name}
        </S.TrackPlayAuthorLink>
      </S.TrackPlayAuthor>
      <S.TrackPlayAlbum>
        <S.TrackPlayAlbumLink theme={theme} href="http://">
          {chosenTrack.author}
        </S.TrackPlayAlbumLink>
      </S.TrackPlayAlbum>
    </S.TrackPlayContain>
  );
};
