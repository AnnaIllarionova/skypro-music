import * as S from "./App.styled.js";
import { Navigation } from "./components/navigation/navigation.js";
import { MusicBar } from "./components/bar/bar.js";
import { SearchComponent } from "./components/search/search.js";
import { FilterTracks } from "./components/filter-tracks/filter-tracks.js";
import { GetPlaylist } from "./components/playlist/playlist.js";
import { Sidebar } from "./components/sidebar/sidebar.js";
import { GlobalStyles } from "./global.styled.js";

function App() {
  return (
    <S.Wrapper>
      <GlobalStyles />
      <S.Container>
        <S.Main>
          <Navigation />
          <S.MainCenterblock>
            <SearchComponent />
            <S.MainCenterblockH2>Треки</S.MainCenterblockH2>
            <FilterTracks />
            <GetPlaylist />
          </S.MainCenterblock>
          <Sidebar />
        </S.Main>
        <MusicBar />
        <footer className="footer"></footer>
      </S.Container>
    </S.Wrapper>
  );
}

export default App;
