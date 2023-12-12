import * as S from "./main-page.styled";
import { Navigation } from "../../components/navigation/navigation";
import { MusicBar } from "../../components/bar/bar.jsx";
import { SearchComponent } from "../../components/search/search.jsx";
import { FilterTracks } from "../../components/filter-tracks/filter-tracks.jsx";
import { GetPlaylist } from "../../components/playlist/playlist.jsx";
import { Sidebar } from "../../components/sidebar/sidebar.jsx";
import { useEffect } from "react";
import { useThemeContext } from "../../components/context/theme-context.jsx";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export const MainPage = ({
  isVisiable,
  setIsVisiable,
  title,
  showFilterTracks,
  showSidebar,
}) => {
  const { theme } = useThemeContext();

  const chosenTrack = useSelector((state) => state.track.chosenTrack);

  useEffect(() => {
    console.log(chosenTrack);
  }, [chosenTrack]);

  useEffect(() => {
    setTimeout(() => {
      setIsVisiable(true);
    }, 3000);
  }, []);

  return (
    <S.Container theme={theme}>
      <S.Main>
        <Navigation />
        <S.MainCenterblock>
          <SearchComponent />
          <S.MainCenterblockH2 theme={theme}>{title}</S.MainCenterblockH2>
          {showFilterTracks ? <FilterTracks /> : null}
          <Outlet  />
        </S.MainCenterblock>
        {showSidebar ? <Sidebar isVisiable={isVisiable} /> : null}
      </S.Main>
      {chosenTrack ? <MusicBar isVisiable={isVisiable} /> : null}
      <footer className="footer"></footer>
    </S.Container>
  );
};

export const TrackListComponent = ({
  isVisiable,
  trackList,
  error,
  isLoading,
  isAllTracksLiked,
}) => {
  return (
    <>
      <GetPlaylist
        isVisiable={isVisiable}
        trackList={trackList}
        error={error}
        isLoading={isLoading}
        isAllTracksLiked={isAllTracksLiked}
      />
    </>
  );
};
