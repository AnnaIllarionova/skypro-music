import styled from "styled-components";

// for MusicBar
export const Bar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(28, 28, 28, 0.5);
`;

export const BarContent = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
`;

export const BarPlayerProgress = styled.div`
  width: 100%;
  height: 5px;
  background: #2e2e2e;
`;
export const BarPlayerBlock = styled.div`
  height: 73px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
`;

export const BarPlayer = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
`;

export const PlayerTrackPlay = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
`;

/* for PlayerControls */
export const PlayerControlsItems = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 0 27px 0 31px;
  align-items: center;
`;

export const CommonStylesForBtn = styled.div`
  padding: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  &:active {
    fill: #696969;
    stroke: #ffffff;
    cursor: pointer;
  }
`;

export const PlayerBtnPrev = styled(CommonStylesForBtn)`
  margin-right: 23px;
`;

export const Button = styled.svg`
  &:hover {
    fill: transparent;
    stroke: #acacac;
    cursor: pointer;
  }
`;

export const ButtonActive = styled(Button)`
  fill: transparent;
  stroke: #ffffff;
  cursor: pointer;
`;

export const PlayerBtnPrevSvg = styled(Button)`
  width: 15px;
  height: 14px;
  stroke: #d9d9d9;
`;

export const PlayerBtnPlay = styled(CommonStylesForBtn)`
  margin-right: 23px;
`;

export const PlayerBtnPlaySvg = styled(Button)`
  width: 22px;
  height: 20px;
  fill: #d9d9d9;
`;

export const PlayerBtnNext = styled(CommonStylesForBtn)`
  margin-right: 28px;
  fill: #a53939;
`;

export const PlayerBtnNextSvg = styled(Button)`
  width: 15px;
  height: 14px;
  fill: inherit;
  stroke: #d9d9d9;
`;

export const PlayerBtnRepeat = styled(CommonStylesForBtn)`
  margin-right: 24px;
`;

export const PlayerBtnRepeatSvg = styled(Button)`
  width: 18px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

export const PlayerBtnRepeatSvgActive = styled(ButtonActive)`
  width: 18px;
  height: 12px;
`;

export const PlayerBtnShuffle = styled(CommonStylesForBtn)`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

export const PlayerBtnShuffleSvg = styled(Button)`
  width: 19px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

/* for LikeOrDislikeCurrentTrack */
export const TrackPlayLikeOrDislike = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-left: 26%;
`;

export const SvgActive = styled.svg`
  cursor: pointer;
`;

export const TrackPlayLikeSvg = styled(SvgActive)`
  width: 14px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;
export const TrackPlayDislikeSvg = styled(SvgActive)`
  width: 14.34px;
  height: 13px;
  fill: transparent;
  stroke: #696969;
`;
export const CommonStylesForLikeOrDislike = styled.div`
  padding: 5px;
`;

export const TrackPlayLike = styled(CommonStylesForLikeOrDislike)``;

export const TrackPlayDislike = styled(CommonStylesForLikeOrDislike)`
  margin-left: 28.5px;
`;

/* for SeeCurrentTrack */
export const TrackPlayContain = styled.div`
  width: auto;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas: "image author" "image album";
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

export const TrackPlayImage = styled.div`
  width: 51px;
  height: 51px;
  background-color: #313131;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 12px;
  -ms-grid-row: 1;
  -ms-grid-row-span: 2;
  -ms-grid-column: 1;
  grid-area: image;
`;

export const TrackPlaySvg = styled.svg`
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
`;
export const TrackPlayAuthor = styled.div`
  -ms-grid-row: 1;
  -ms-grid-column: 2;
  grid-area: author;
  min-width: 49px;
  min-height: 19px;
  background: ${(props) => (props.isVisiable ? "#313131" : "initial")};
`;

export const TrackPlayAuthorLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  white-space: nowrap;
`;
export const TrackPlayAlbum = styled.div`
  -ms-grid-row: 2;
  -ms-grid-column: 2;
  grid-area: album;
  min-width: 49px;
  min-height: 19px;
  background: ${(props) => (props.isVisiable ? "#313131" : "initial")};
`;

export const TrackPlayAlbumLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #ffffff;
`;

/* for CorrectVolume */
export const BarVolumeBlock = styled.div`
  width: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 92px 0 0;
`;

export const VolumeContent = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: end;
`;

export const VolumeImage = styled.div`
  width: 13px;
  height: 18px;
  margin-right: 17px;
`;

export const VolumeSvg = styled.svg`
  width: 13px;
  height: 18px;
  fill: transparent;
`;

export const VolumeProgress = styled.div`
  width: 109px;
`;

export const VolumeProgressLine = styled.input`
  width: 109px;
`;
