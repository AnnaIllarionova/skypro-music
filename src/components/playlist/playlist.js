import * as S from "./playlist.styled.js";
import { tracksList } from "./tracklist.js";
import { useState } from "react";

export function GetPlaylist() {
  return (
    <S.CenterblockContent>
      <GetTitleOfPlaylist />
      <S.ContentPlaylist>
        <TracksOfPlaylist />
      </S.ContentPlaylist>
    </S.CenterblockContent>
  );
}

function TracksOfPlaylist() {
  const [isVisiable, setIsVisiable] = useState(false);
  setTimeout(() => {
    setIsVisiable(true);
  }, 3000);
  const tracks = tracksList.map((track) => (
    <S.PlaylistTrack key={track.id}>
      <S.TrackTitle>
        <S.TrackTitleImage>
          {isVisiable && (
            <S.TrackTitleSvg alt="music">
              <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
            </S.TrackTitleSvg>
          )}
        </S.TrackTitleImage>
        <S.TrackTitleText isVisiable={!isVisiable}>
          {isVisiable && (
            <S.TrackTitleLink href="http://">
              {track.nameOfTheSong}
              <S.TrackTitleSpan>
                {" " + track.additionToTheSong}
              </S.TrackTitleSpan>
            </S.TrackTitleLink>
          )}
        </S.TrackTitleText>
      </S.TrackTitle>
      <S.TrackAuthor isVisiable={!isVisiable}>
        {isVisiable && (
          <S.TrackAuthorLink href="http://">{track.singer}</S.TrackAuthorLink>
        )}
      </S.TrackAuthor>
      <S.TrackAlbum isVisiable={!isVisiable}>
        {isVisiable && (
          <S.TrackAlbumLink href="http://">{track.musicAlbum}</S.TrackAlbumLink>
        )}
      </S.TrackAlbum>
      <S.TrackTime isVisiable={!isVisiable}>
        {isVisiable && (
          <>
            <S.TrackTimeSvg alt="time">
              <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
            </S.TrackTimeSvg>
            <S.TrackTimeText>{track.trackDuration}</S.TrackTimeText>
          </>
        )}
      </S.TrackTime>
    </S.PlaylistTrack>
  ));
  return <S.PlaylistItem>{tracks}</S.PlaylistItem>;
}

function GetTitleOfPlaylist() {
  return (
    <S.ContentTitle >
      <S.PlaylistTitleCol01>Трек</S.PlaylistTitleCol01>
      <S.PlaylistTitleCol02>ИСПОЛНИТЕЛЬ</S.PlaylistTitleCol02>
      <S.PlaylistTitleCol03>АЛЬБОМ</S.PlaylistTitleCol03>
      <S.PlaylistTitleCol04>
        <S.PlaylistTitleSvg alt="time">
          <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
        </S.PlaylistTitleSvg>
      </S.PlaylistTitleCol04>
    </S.ContentTitle>
  );
}
