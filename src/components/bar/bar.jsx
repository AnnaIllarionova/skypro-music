import { useEffect, useRef, useState } from "react";
import * as S from "./bar.styled";
import { LikeOrDislikeCurrentTrack } from "./like-dislike-current-track";
import { CorrectVolume, PlayerControls } from "./player-controls";
import { TrackTimeText } from "../playlist/playlist.styled";
import { formatTime } from "../formated-time/formated-time";
import { useThemeContext } from "../context/theme-context";
import { useDispatch, useSelector } from "react-redux";
import {
  pauseTrack,
  playNextTrack,
  playTrack,
} from "../../store/slices/slices";
import { useGetTrackByIdQuery } from "../../services/api-services";
import { useContext } from "react";
import { CurrentUserContext } from "../../routes";

export const MusicBar = () => {
  const { theme } = useThemeContext();

  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const chosenTrack = useSelector((state) => state.track.chosenTrack);
  const isPlaying = useSelector((state) => state.track.isPlaying);
  const dispatch = useDispatch();

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
    dispatch(playTrack());
  };
  const pause = () => {
    audioRef.current.pause();
    dispatch(pauseTrack());
  };
  const togglePlay = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  // useEffect(() => {
  //   if (chosenTrack) {
  //     play();
  //   } else {
  //     pause();
  //   }
  // }, [chosenTrack]);

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
    const handleEnded = () => {
      dispatch(playNextTrack());
    };
    const onCanPlayThrough = () => {
      audioElement.play();
      dispatch(playTrack());
    };
    //при быстром переключении не должны выскакивать ошибка. что данные не успели загрузиться
    audioElement.addEventListener("canplaythrough", onCanPlayThrough);
    //После окончания трека играет следующий
    audioElement.addEventListener("ended", handleEnded);
    //время обновляется каждую секунду
    audioElement.addEventListener("timeupdate", handleTimeUpdateEvent);
    return () => {
      audioElement.removeEventListener("canplaythrough", onCanPlayThrough);
      audioElement.removeEventListener("ended", handleEnded);
      audioElement.removeEventListener("timeupdate", handleTimeUpdateEvent);
    };
  }, [isLooped]);

  const { data } = useGetTrackByIdQuery({
    id: chosenTrack.id
  });
  console.log(data);
  const { user } = useContext(CurrentUserContext);
  const isLikedData=(data.stared_user ?? []).find(({ id }) => id === user.id)
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
        ></S.BarPlayerProgress>
        <S.BarPlayerBlock>
          <S.BarPlayer>
            <PlayerControls
              togglePlay={togglePlay}
              isLooped={isLooped}
              toggleLoop={toggleLoop}
            />
            <S.PlayerTrackPlay>
              <SeeCurrentTrack
                theme={theme}
                // chosenTrack={chosenTrack}
                onClick={togglePlay}
              />
              <LikeOrDislikeCurrentTrack data={data} isLikedData={isLikedData} />
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

const SeeCurrentTrack = ({ theme }) => {
  const chosenTrack = useSelector((state) => state.track.chosenTrack);

  return (
    <S.TrackPlayContain>
      <S.TrackPlayImage theme={theme}>
        <S.TrackPlaySvg alt="music">
          <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
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
