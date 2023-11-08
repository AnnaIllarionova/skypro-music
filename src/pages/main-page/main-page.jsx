import * as S from "./main-page.styled";
import { Navigation } from "../../components/navigation/navigation";
import { MusicBar } from "../../components/bar/bar.jsx";
import { SearchComponent } from "../../components/search/search.jsx";
import { FilterTracks } from "../../components/filter-tracks/filter-tracks.jsx";
import { GetPlaylist } from "../../components/playlist/playlist.jsx";
import { Sidebar } from "../../components/sidebar/sidebar.jsx";
import { useState, useEffect } from "react";
import { themes, ThemeContext } from "../../components/themes/theme-context";

export const MainPage = ({
  user,
  setUser,
  apiTracks,
  addTracksGottenError,
}) => {
  const [currentTheme, setCurrentTheme] = useState(themes.dark);

  const toggleTheme = () => {
    console.log("change theme");
    if (currentTheme === themes.dark) {
      setCurrentTheme(themes.light);
      return;
    }
    setCurrentTheme(themes.dark);
  };

  const [chosenTrack, setChosenTrack] = useState(null);

  const [isVisiable, setIsVisiable] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisiable(true);
    }, 3000);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <S.Container>
        <S.Main>
          <Navigation user={user} setUser={setUser} />
          <S.MainCenterblock>
            <SearchComponent />
            <S.MainCenterblockH2>Треки</S.MainCenterblockH2>
            <FilterTracks />
            <GetPlaylist
              apiTracks={apiTracks}
              addTracksGottenError={addTracksGottenError}
              isVisiable={isVisiable}
              chosenTrack={chosenTrack}
              setChosenTrack={setChosenTrack}
            />
          </S.MainCenterblock>
          <Sidebar isVisiable={isVisiable} user={user} setUser={setUser} />
        </S.Main>
        {chosenTrack ? (
          <MusicBar isVisiable={isVisiable} chosenTrack={chosenTrack} />
        ) : null}

        <footer className="footer"></footer>
      </S.Container>
    </ThemeContext.Provider>
  );
};
