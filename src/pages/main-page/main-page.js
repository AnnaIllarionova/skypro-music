import * as S from "./main-page.styled";
import { Navigation } from "../../components/navigation/navigation";
import { MusicBar } from "../../components/bar/bar.js";
import { SearchComponent } from "../../components/search/search.js";
import { FilterTracks } from "../../components/filter-tracks/filter-tracks.js";
import { GetPlaylist } from "../../components/playlist/playlist.js";
import { Sidebar } from "../../components/sidebar/sidebar.js";

export const MainPage = ({user, setUser}) => {
  return (
    <S.Container>
      <S.Main>
        <Navigation user={user} setUser={setUser} />
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
  );
};
