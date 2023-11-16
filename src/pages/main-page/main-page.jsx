import * as S from "./main-page.styled";
import { Navigation } from "../../components/navigation/navigation";
import { MusicBar } from "../../components/bar/bar.jsx";
import { SearchComponent } from "../../components/search/search.jsx";
import { FilterTracks } from "../../components/filter-tracks/filter-tracks.jsx";
import { GetPlaylist } from "../../components/playlist/playlist.jsx";
import { Sidebar } from "../../components/sidebar/sidebar.jsx";
import { useState, useEffect } from "react";
import { useThemeContext } from "../../components/context/theme-context.jsx";

export const MainPage = ({
  user,
  apiTracks,
  addTracksGottenError,
}) => {
  const { theme } = useThemeContext();

  const [chosenTrack, setChosenTrack] = useState(null);

  const [isVisiable, setIsVisiable] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisiable(true);
    }, 3000);
  }, []);

  return (
    <S.Container
    theme={theme}
      // style={{ backgroundColor: theme.background, color: theme.color }}
    >
      <S.Main>
        <Navigation user={user} />
        <S.MainCenterblock>
          <SearchComponent />
          <S.MainCenterblockH2  theme={theme}>Треки</S.MainCenterblockH2>
          <FilterTracks />
          <GetPlaylist
            apiTracks={apiTracks}
            addTracksGottenError={addTracksGottenError}
            isVisiable={isVisiable}
            chosenTrack={chosenTrack}
            setChosenTrack={setChosenTrack}
          />
        </S.MainCenterblock>
        <Sidebar isVisiable={isVisiable} user={user} />
      </S.Main>
      {chosenTrack ? (
        <MusicBar isVisiable={isVisiable} chosenTrack={chosenTrack} />
      ) : null}

      <footer className="footer"></footer>
    </S.Container>
  );
};
