import "./App.css";
import { Navigation } from "./components/navigation/navigation.js";
import { MusicBar } from "./components/bar/bar.js";
import { SearchComponent } from "./components/search/search.js";
import { FilterTracks } from "./components/filter-tracks/filter-tracks.js";
import { GetPlaylist } from "./components/playlist/playlist.js";
import { Sidebar } from "./components/sidebar/sidebar.js";


function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <Navigation />
          <div className="main__centerblock centerblock">
            <SearchComponent />
            <h2 className="centerblock__h2">Треки</h2>
            <FilterTracks />
            <GetPlaylist />
          </div>
          <Sidebar />
        </main>
        <MusicBar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

export default App;
