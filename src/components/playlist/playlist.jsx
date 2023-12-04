import * as S from "./playlist.styled";
import { getOneTrack } from "../../Api";
import { formatTime } from "../formated-time/formated-time.jsx";
import {
  SkeletonTrackImage,
  SkeletonTrackTime,
  SkeletonTrackTitleText,
} from "../skeleton/skeleton.jsx";
import { useThemeContext } from "../context/theme-context.jsx";
import { useDispatch, useSelector } from "react-redux";
import { chooseCurrentTrack } from "../../store/slices/slices.js";
import {
  useAddTrackInMyPlaylistMutation,
  useGetAllTracksQuery,
  useRemoveTrackFromMyPlaylistMutation,
} from "../../services/api-services.js";
import { useNavigate } from "react-router-dom";

export function GetPlaylist({ isVisiable }) {
  return (
    <S.CenterblockContent>
      <GetTitleOfPlaylist />
      <S.ContentPlaylist>
        <TracksOfPlaylist isVisiable={isVisiable} />
      </S.ContentPlaylist>
    </S.CenterblockContent>
  );
}

export function TracksOfPlaylist({ isVisiable }) {
  const { data: trackList } = useGetAllTracksQuery();

  const tracks =
    trackList &&
    trackList.map((track) => (
      <CreateOneTrack key={track.id} isVisiable={isVisiable} track={track} />
    ));
  return <S.PlaylistItem>{tracks}</S.PlaylistItem>;
}

export const CreateOneTrack = ({ isVisiable, track }) => {
  const { data: trackList, error, isLoading } = useGetAllTracksQuery();
  const [addTrackInMyPlaylist, {error: addLikeError, isError: isAddLikeError}] = useAddTrackInMyPlaylistMutation();
  const [removeTrackFromMyPlaylist] = useRemoveTrackFromMyPlaylistMutation();

  if (error) {
    return (
      <S.ErrorText>
        Не удалось загрузить плейлист, попробуйте позже: {error.message}
      </S.ErrorText>
    );
  }

  const isEmptyList = !isLoading && (!trackList || trackList.length === 0);
  if (isEmptyList) {
    return <p>Ваш плейлист пока пуст</p>;
  }
  const { theme } = useThemeContext();
  const chosenTrack = useSelector((state) => state.track.chosenTrack);
  const isPlaying = useSelector((state) => state.track.isPlaying);
  const isLiked = useSelector((state) => state.track.isLiked);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChooseTrackClick = ({ track, id }) => {
    if (isVisiable) {
      getOneTrack({ id });
      dispatch(chooseCurrentTrack({ track: track, playlist: trackList }));
    }
  };

  const handleAddLike = async ({ track }) => {
    try {
      addTrackInMyPlaylist({
        id: track.id,
      }).unwrap
    } catch (error) {
      console.log(error);
      
    }
  };
  const handleRemoveLike = ({ track }) => {
    try {
      removeTrackFromMyPlaylist({ id: track.id });
    } catch (error) {
      if (error.status === 401) {
        navigate("/signin");
      }
    }
  };

  if (isAddLikeError && addLikeError.status === 401) {
    navigate("/signin");
  }
  return (
    <S.PlaylistTrack theme={theme} key={track.id}>
      <S.PlaylistTrackName
        onClick={() => handleChooseTrackClick({ track, id: track.id })}
      >
        <S.TrackTitle>
          <S.TrackTitleImage theme={theme}>
            {isVisiable ? (
              chosenTrack && chosenTrack.id === track.id ? (
                <S.CurrentTrackPlayingDot
                  isPlaying={isPlaying}
                ></S.CurrentTrackPlayingDot>
              ) : (
                <S.TrackTitleSvg alt="music">
                  <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
                </S.TrackTitleSvg>
              )
            ) : (
              <SkeletonTrackImage />
            )}
          </S.TrackTitleImage>
          <S.TrackTitleText>
            {isVisiable ? (
              <S.TrackTitleLink theme={theme} href="#">
                {track.name}
                <S.TrackTitleSpan></S.TrackTitleSpan>
              </S.TrackTitleLink>
            ) : (
              <SkeletonTrackTitleText />
            )}
          </S.TrackTitleText>
        </S.TrackTitle>
        <S.TrackAuthor>
          {isVisiable ? (
            <S.TrackAuthorLink theme={theme} href="#">
              {track.author}
            </S.TrackAuthorLink>
          ) : (
            <SkeletonTrackTitleText />
          )}
        </S.TrackAuthor>
        <S.TrackAlbum>
          {isVisiable ? (
            <S.TrackAlbumLink href="#">{track.album}</S.TrackAlbumLink>
          ) : (
            <SkeletonTrackTitleText />
          )}
        </S.TrackAlbum>
      </S.PlaylistTrackName>

      <S.TrackTime>
        {isVisiable ? (
          <>
            {isLiked ? (
              <S.TrackTimeSvgActive
                alt="time"
                onClick={() => handleRemoveLike(track)}
              >
                <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
              </S.TrackTimeSvgActive>
            ) : (
              <S.TrackTimeSvg
                alt="time"
                onClick={() => handleAddLike({ track })}
              >
                <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
              </S.TrackTimeSvg>
            )}

            <S.TrackTimeText>
              {formatTime(track.duration_in_seconds)}
            </S.TrackTimeText>
          </>
        ) : (
          <SkeletonTrackTime />
        )}
      </S.TrackTime>
    </S.PlaylistTrack>
  );
};

export function GetTitleOfPlaylist() {
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
