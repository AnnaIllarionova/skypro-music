import styled, { css, keyframes } from "styled-components";

export const CenterblockContent = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-height: 0px;
  height: 70vh;
`;

export const ContentPlaylist = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-y: auto;
  padding-right: 10px;
`;

export const PlaylistItem = styled.div`
  width: 100%;
  display: block;
  margin-bottom: 12px;
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

export const PlaylistTrack = styled.div`
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
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  column-gap: 6px;

  &:hover {
    background-color: ${(props) => props.theme.backgroundColor};
  }
`;

export const PlaylistTrackName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  column-gap: 6px;
`;

export const TrackTitle = styled.div`
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
  width: 447px;
`;

export const TrackTitleImage = styled.div`
  width: 51px;
  height: 51px;
  padding: 16px;
  background: ${(props) => props.theme.backgroundColor};
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-right: 17px;
`;
export const TrackTitleSvg = styled.svg`
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
`;
const bubble_out = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const CurrentTrackPlayingDot = styled.div`
  width: 16px;
  height: 16px;
  background-color: #b672ff;
  border-radius: 8px;
  display: block;
  animation: ${(props) =>
    props.isPlaying
      ? css`
          ${bubble_out} 0.6s ease-in-out infinite both
        `
      : null};
`;

export const TrackTitleText = styled.div`
  min-height: 24px;
  min-width: 225px;
  background: inherit;
`;
export const TrackLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;
export const TrackTitleLink = styled(TrackLink)`
  color: ${(props) => props.theme.color};
`;

export const TrackTitleSpan = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4e4e4e;
`;

export const TrackAuthor = styled.div`
  width: 321px;
  min-height: 24px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  background: inherit;
`;

export const TrackAuthorLink = styled(TrackLink)`
  text-align: left;
  color: ${(props) => props.theme.color};
`;

export const TrackAlbum = styled.div`
  width: 245px;
  height: 24px;
  background: inherit;
`;

export const TrackAlbumLink = styled(TrackLink)`
  color: #696969;
`;

export const ErrorText = styled(TrackLink)`
  font-size: 18px;
`;

export const TrackTime = styled.div`
  height: 24px;
  min-width: 60px;
  background: inherit;
`;

export const TrackTimeSvg = styled.svg`
  width: 14px;
  height: 12px;
  margin-right: 17px;
  fill: transparent;
  stroke: #696969;
`;

export const TrackTimeSvgActive = styled.svg`
  width: 14px;
  height: 12px;
  margin-right: 17px;
  fill: #b672ff;
  stroke-width: 1px;
  stroke: #b672ff;
`;

export const TrackTimeText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #696969;
`;

/* for GetTitleOfPlaylist */
export const ContentTitle = styled.div`
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
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-right: 10px;
`;

export const CommonStylesForTitles = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 2px;
  color: #696969;
  text-transform: uppercase;
`;

export const PlaylistTitleCol01 = styled(CommonStylesForTitles)`
  width: 447px;
`;

export const PlaylistTitleCol02 = styled(CommonStylesForTitles)`
  width: 321px;
`;

export const PlaylistTitleCol03 = styled(CommonStylesForTitles)`
  width: 245px;
`;

export const PlaylistTitleCol04 = styled(CommonStylesForTitles)`
  width: 60px;
  text-align: center;
`;
export const PlaylistTitleSvg = styled.svg`
  width: 12px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;
