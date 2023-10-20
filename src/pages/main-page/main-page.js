import * as S from "./main-page.styled";
import { Navigation } from "../../components/navigation/navigation";
import { MusicBar } from "../../components/bar/bar.js";
import { SearchComponent } from "../../components/search/search.js";
import { FilterTracks } from "../../components/filter-tracks/filter-tracks.js";
import { GetPlaylist } from "../../components/playlist/playlist.js";
import { Sidebar } from "../../components/sidebar/sidebar.js";
import { useState, useEffect } from "react";

export const MainPage = ({
  user,
  setUser,
  apiTracks,
  addTracksGottenError,
}) => {
  const [chosenTrack, setChosenTrack] = useState(null);

  const [isVisiable, setIsVisiable] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisiable(true);
    }, 3000);
  }, []);

  return (
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
  );
};
