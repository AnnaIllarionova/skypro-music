import "./playlist.css";
import { tracksList } from "./tracklist.js";
import { useState } from "react";

export function GetPlaylist() {
  return (
    <div className="centerblock__content">
      <GetTitleOfPlaylist />
      <div className="content__playlist playlist">
        <TracksOfPlaylist />
      </div>
    </div>
  );
}

function GetTitleOfPlaylist() {
  return (
    <div className="content__title playlist-title">
      <div className="playlist-title__col col01">Трек</div>
      <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
      <div className="playlist-title__col col03">АЛЬБОМ</div>
      <div className="playlist-title__col col04">
        <svg className="playlist-title__svg" alt="time">
          <use xlinkHref="img/icon/sprite.svg#icon-watch"></use>
        </svg>
      </div>
    </div>
  );
}

function TracksOfPlaylist() {
  const [isVisiable, setIsVisiable] = useState(false);
  setTimeout(() => {
    setIsVisiable(true);
  }, 3000);
  const tracks = tracksList.map((track) => (
    <div className="playlist__track track" key={track.id}>
      <div className="track__title">
        <div className="track__title-image">
          {isVisiable && (
            <svg className="track__title-svg" alt="music">
              <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
            </svg>
          )}
        </div>
        <div
          className="track__title-text"
          style={!isVisiable ? { background: "#313131" } : {}}
        >
          {isVisiable && (
            <a className="track__title-link" href="http://">
              {track.nameOfTheSong}
              <span className="track__title-span">
                {track.additionToTheSong}
              </span>
            </a>
          )}
        </div>
      </div>
      <div
        className="track__author"
        style={!isVisiable ? { background: "#313131" } : {}}
      >
        {isVisiable && (
          <a className="track__author-link" href="http://">
            {track.singer}
          </a>
        )}
      </div>
      <div
        className="track__album"
        style={!isVisiable ? { background: "#313131" } : {}}
      >
        {isVisiable && (
          <a className="track__album-link" href="http://">
            {track.musicAlbum}
          </a>
        )}
      </div>
      <div
        className="track__time"
        style={!isVisiable ? { background: "#313131" } : {}}
      >
        {isVisiable && (
          <>
            <svg className="track__time-svg" alt="time">
              <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
            </svg>
            <span className="track__time-text">{track.trackDuration}</span>
          </>
        )}
      </div>
    </div>
  ));
  return <div className="playlist__item">{tracks}</div>;
}
