import "./App.css";
import { Navigation } from "./components/navigation.js";
import { Bar } from "./components/bar.js";
import { SearchComponent } from "./components/search.js";
import { FilterTracks } from "./components/filter-tracks.js";
import { GetPlaylist } from "./components/playlist.js";
import { Sidebar } from "./components/sidebar.js";

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
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

export default App;
