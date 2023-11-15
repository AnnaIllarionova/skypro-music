import * as S from "./bar.styled";

export const PlayerControls = ({
  togglePlay,
  isPlaying,
  isLooped,
  toggleLoop,
}) => {
  const handleClicked = () => {
    alert("Функционал еще не реализован");
  };
  return (
    <S.PlayerControlsItems>
      <S.PlayerBtnPrev onClick={handleClicked}>
        <S.PlayerBtnPrevSvg alt="prev">
          <use xlinkHref="img/icon/sprite.svg#icon-prev"></use>
        </S.PlayerBtnPrevSvg>
      </S.PlayerBtnPrev>
      <S.PlayerBtnPlay onClick={togglePlay}>
        <S.PlayerBtnPlaySvg alt="play">
          <use
            xlinkHref={
              isPlaying
                ? "img/icon/sprite.svg#icon-pause"
                : "img/icon/sprite.svg#icon-play"
            }
          ></use>
        </S.PlayerBtnPlaySvg>
      </S.PlayerBtnPlay>
      <S.PlayerBtnNext onClick={handleClicked}>
        <S.PlayerBtnNextSvg alt="next">
          <use xlinkHref="img/icon/sprite.svg#icon-next"></use>
        </S.PlayerBtnNextSvg>
      </S.PlayerBtnNext>
      <S.PlayerBtnRepeat onClick={toggleLoop}>
        {isLooped ? (
          <S.PlayerBtnRepeatSvgActive alt="repeat">
            <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
          </S.PlayerBtnRepeatSvgActive>
        ) : (
          <S.PlayerBtnRepeatSvg alt="repeat">
            <use xlinkHref="img/icon/sprite.svg#icon-repeat"></use>
          </S.PlayerBtnRepeatSvg>
        )}
      </S.PlayerBtnRepeat>
      <S.PlayerBtnShuffle onClick={handleClicked}>
        <S.PlayerBtnShuffleSvg alt="shuffle">
          <use xlinkHref="img/icon/sprite.svg#icon-shuffle"></use>
        </S.PlayerBtnShuffleSvg>
      </S.PlayerBtnShuffle>
    </S.PlayerControlsItems>
  );
};

export const CorrectVolume = ({
  volume,
  changeVolume,
  toggleMute,
  isMuted,
}) => {
  return (
    <S.BarVolumeBlock>
      <S.VolumeContent>
        <S.VolumeImage>
          <S.VolumeSvg alt="volume" onClick={toggleMute}>
            <use
              xlinkHref={
                isMuted
                  ? "img/icon/sprite.svg#icon-volume-muted"
                  : "img/icon/sprite.svg#icon-volume"
              }
            ></use>
          </S.VolumeSvg>
        </S.VolumeImage>
        <S.VolumeProgress>
          <S.VolumeProgressLine
            type="range"
            value={volume}
            onChange={changeVolume}
            min={0}
            max={1}
            step={0.01}
          />
        </S.VolumeProgress>
      </S.VolumeContent>
    </S.BarVolumeBlock>
  );
};
