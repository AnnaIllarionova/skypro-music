import * as S from "./playlist.styled.js";
import { getOneTrack } from "../../Api.js";

export function GetPlaylist({
  apiTracks,
  addTracksGottenError,
  isVisiable,
  setChosenTrack,
}) {
  return (
    <S.CenterblockContent>
      <GetTitleOfPlaylist />
      <S.ContentPlaylist>
        {addTracksGottenError ? (
          <S.ErrorText>
            Не удалось загрузить плейлист, попробуйте позже:{" "}
            {addTracksGottenError}
          </S.ErrorText>
        ) : null}
        <TracksOfPlaylist
          apiTracks={apiTracks}
          isVisiable={isVisiable}
          setChosenTrack={setChosenTrack}
        />
      </S.ContentPlaylist>
    </S.CenterblockContent>
  );
}

function TracksOfPlaylist({ apiTracks, isVisiable, setChosenTrack }) {
  const handleChooseTrackClick = ({ track, id }) => {
    getOneTrack({ id });
    setChosenTrack(track);
  };
  const tracks = apiTracks.map((track) => (
    <S.PlaylistTrack
      onClick={() => handleChooseTrackClick({ track, id: track.id })}
      key={track.id}
    >
      {/* {chosenTrack ? <p>Текущий трек: {chosenTrack.name}</p> : null} */}

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
            <S.TrackTitleLink href="#">
              {track.name}
              <S.TrackTitleSpan></S.TrackTitleSpan>
            </S.TrackTitleLink>
          )}
        </S.TrackTitleText>
      </S.TrackTitle>
      <S.TrackAuthor isVisiable={!isVisiable}>
        {isVisiable && (
          <S.TrackAuthorLink href="#">{track.author}</S.TrackAuthorLink>
        )}
      </S.TrackAuthor>
      <S.TrackAlbum isVisiable={!isVisiable}>
        {isVisiable && (
          <S.TrackAlbumLink href="#">{track.album}</S.TrackAlbumLink>
        )}
      </S.TrackAlbum>
      <S.TrackTime isVisiable={!isVisiable}>
        {isVisiable && (
          <>
            <S.TrackTimeSvg alt="time">
              <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
            </S.TrackTimeSvg>
            <S.TrackTimeText>
              {(track.duration_in_seconds / 60).toFixed(2)}
            </S.TrackTimeText>
          </>
        )}
      </S.TrackTime>
    </S.PlaylistTrack>
  ));
  return <S.PlaylistItem>{tracks}</S.PlaylistItem>;
}

function GetTitleOfPlaylist() {
  return (
    <S.ContentTitle>
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
