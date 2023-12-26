import * as S from "./playlist.styled";
import { formatTime } from "../formated-time/formated-time.jsx";
import {
  SkeletonTrackImage,
  SkeletonTrackTime,
  SkeletonTrackTitleText,
} from "../skeleton/skeleton.jsx";
import { useThemeContext } from "../context/theme-context.jsx";
import { useDispatch, useSelector } from "react-redux";
import { chooseCurrentTrack, removeIsShuffled } from "../../store/slices/slices.js";
import {
  useAddTrackInMyPlaylistMutation,
  useGetTrackByIdQuery,
  useRemoveTrackFromMyPlaylistMutation,
} from "../../services/api-services-reauth.js";
import { useGetAllTracksQuery } from "../../services/api-services.js";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../routes.jsx";
import { useEffect } from "react";

export function GetPlaylist({
  isVisiable,
  trackList,
  error,
  isLoading,
  isAllTracksLiked,
  searchText,
}) {
  return (
    <S.CenterblockContent>
      <GetTitleOfPlaylist />
      <S.ContentPlaylist>
        <TracksOfPlaylist
          searchText={searchText}
          isVisiable={isVisiable}
          trackList={trackList}
          error={error}
          isLoading={isLoading}
          isAllTracksLiked={isAllTracksLiked}
        />
      </S.ContentPlaylist>
    </S.CenterblockContent>
  );
}

export function TracksOfPlaylist({
  searchText,
  isVisiable,
  trackList,
  error,
  isLoading,
  isAllTracksLiked,
}) {
  const [filterResults, setFilterResults] = useState([]);
  const isAuthor = useSelector((state) => state.track.isAuthor);
  const isDateOfRelease = useSelector((state) => state.track.isDateOfRelease);
  const isGenre = useSelector((state) => state.track.isGenre);
  const filteredTracklist = useSelector(
    (state) => state.track.filteredTracklist,
  );

  const filterTracks =
    trackList &&
    trackList.filter(
      (track) =>
        track.name.toLowerCase().includes(searchText.toLowerCase()) ||
        track.author.toLowerCase().includes(searchText.toLowerCase()) ||
        track.album.toLowerCase().includes(searchText.toLowerCase()),
    );
  const tracks =
    trackList &&
    trackList.map((track) => (
      <CreateOneTrack
        key={track.id}
        isVisiable={isVisiable}
        track={track}
        trackList={trackList}
        error={error}
        isLoading={isLoading}
        isAllTracksLiked={isAllTracksLiked}
      />
    ));
  useEffect(() => {
    if (searchText !== "") {
      setFilterResults(filterTracks);
    } else {
      setFilterResults(tracks);
    }
  }, [searchText]);

  return (
    <S.PlaylistItem>
      {searchText.length > 0 ? (
        filterResults.length > 0 ? (
          filterResults.map((track) => (
            <CreateOneTrack
              key={track.id}
              isVisiable={isVisiable}
              track={track}
              trackList={trackList}
              error={error}
              isLoading={isLoading}
              isAllTracksLiked={isAllTracksLiked}
            />
          ))
        ) : (
          <p>По вашему запросу ничего не найдено.</p>
        )
      ) : (isAuthor && isGenre) || isAuthor || isGenre || isDateOfRelease ? (
        filteredTracklist.map((track) => (
          <CreateOneTrack
            key={track.id}
            isVisiable={isVisiable}
            track={track}
            trackList={trackList}
            error={error}
            isLoading={isLoading}
            isAllTracksLiked={isAllTracksLiked}
          />
        ))
      ) : (
        tracks
      )}
    </S.PlaylistItem>
  );
}

export const CreateOneTrack = ({
  isVisiable,
  track,
  trackList,
  isLoading,
  isAllTracksLiked,
}) => {
  const { handleLogout } = useContext(CurrentUserContext);
  const { refetch } = useGetAllTracksQuery();
  const [
    addTrackInMyPlaylist,
    { error: addLikeError, isError: isAddLikeError },
  ] = useAddTrackInMyPlaylistMutation();
  const [
    removeTrackFromMyPlaylist,
    { error: removeLikeError, isError: isRemoveLikeError },
  ] = useRemoveTrackFromMyPlaylistMutation();

  if (
    (isRemoveLikeError && removeLikeError.status === 401) ||
    (isAddLikeError && addLikeError.status === 401)
  ) {
    handleLogout();
  }

  const isEmptyList = !isLoading && (!trackList || trackList.length === 0);
  if (isEmptyList) {
    return <p>Ваш плейлист пока пуст</p>;
  }
  const { theme } = useThemeContext();
  const chosenTrack = useSelector((state) => state.track.chosenTrack);
  const isPlaying = useSelector((state) => state.track.isPlaying);
  const dispatch = useDispatch();
  const { user } = useContext(CurrentUserContext);
  const { data } = useGetTrackByIdQuery({
    id: track.id,
  });
  const isLikedData = (data?.stared_user ?? []).find(
    ({ id }) => id === user.id,
  );
  const isLiked = data?.stared_user.includes(isLikedData);

  const handleChooseTrackClick = ({ track }) => {
    if (isVisiable) {
      dispatch(chooseCurrentTrack({ track: track, playlist: trackList }));
    }
    dispatch(removeIsShuffled());
  };

  const handleAddOrRemoveLike = async ({ track }) => {
    try {
      if (isLiked || isAllTracksLiked) {
        await removeTrackFromMyPlaylist({ id: track.id }).unwrap();
        refetch();
      } else {
        await addTrackInMyPlaylist({
          id: track.id,
        }).unwrap();
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.PlaylistTrack theme={theme} key={track.id}>
      <S.TrackTitle
        onClick={() => handleChooseTrackClick({ track, id: track.id })}
      >
        <S.TrackTitleImage theme={theme}>
          {isVisiable ? (
            chosenTrack && chosenTrack.id === track.id ? (
              <S.CurrentTrackPlayingDot
                isPlaying={isPlaying}
              ></S.CurrentTrackPlayingDot>
            ) : (
              <S.TrackTitleSvg alt="music">
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
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
      <S.TrackAuthor
        onClick={() => handleChooseTrackClick({ track, id: track.id })}
      >
        {isVisiable ? (
          <S.TrackAuthorLink theme={theme} href="#">
            {track.author}
          </S.TrackAuthorLink>
        ) : (
          <SkeletonTrackTitleText />
        )}
      </S.TrackAuthor>
      <S.TrackAlbum
        onClick={() => handleChooseTrackClick({ track, id: track.id })}
      >
        {isVisiable ? (
          <S.TrackAlbumLink href="#">{track.album}</S.TrackAlbumLink>
        ) : (
          <SkeletonTrackTitleText />
        )}
      </S.TrackAlbum>

      <S.TrackTime onClick={() => handleAddOrRemoveLike({ track })}>
        {isVisiable ? (
          <>
            {isLiked || isAllTracksLiked ? (
              <S.TrackTimeSvgActive alt="time">
                <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
              </S.TrackTimeSvgActive>
            ) : (
              <S.TrackTimeSvg alt="time">
                <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
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
          <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
        </S.PlaylistTitleSvg>
      </S.PlaylistTitleCol04>
    </S.ContentTitle>
  );
}
