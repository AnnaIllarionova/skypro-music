import * as S from "./main-page.styled";
import { Navigation } from "../../components/navigation/navigation";
import { MusicBar } from "../../components/bar/bar.jsx";
import { SearchComponent } from "../../components/search/search.jsx";
import { FilterTracks } from "../../components/filter-tracks/filter-tracks.jsx";
import { GetPlaylist } from "../../components/playlist/playlist.jsx";
import { Sidebar } from "../../components/sidebar/sidebar.jsx";
import { useState, useEffect } from "react";
import { useThemeContext } from "../../components/context/theme-context.jsx";
import { useSelector } from "react-redux";

export const MainPage = ({
  user,
  apiTracks,
  addTracksGottenError,
}) => {
  const { theme } = useThemeContext();

  const chosenTrack = useSelector(state => state.track.chosenTrack)

  useEffect(() => {
    console.log(chosenTrack);

  }, [chosenTrack])

  const [isVisiable, setIsVisiable] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisiable(true);
    }, 3000);
  }, []);

  return (
    <S.Container
    theme={theme}
    >
      <S.Main>
        <Navigation user={user} />
        <S.MainCenterblock>
          <SearchComponent />
          <S.MainCenterblockH2  theme={theme}>Треки</S.MainCenterblockH2>
          <FilterTracks apiTracks={apiTracks} />
          <GetPlaylist
            apiTracks={apiTracks}
            addTracksGottenError={addTracksGottenError}
            isVisiable={isVisiable}
          />
        </S.MainCenterblock>
        <Sidebar isVisiable={isVisiable} user={user} />
      </S.Main>
      {chosenTrack ? (
        <MusicBar 
        isVisiable={isVisiable} 
         />
      ) : null}

      <footer className="footer"></footer>
    </S.Container>
  );
};
