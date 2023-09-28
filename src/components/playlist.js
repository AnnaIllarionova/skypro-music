import "./playlist.css";

export function GetPlaylist() {
  return (
    <div className="centerblock__content">
      <GetTitleOfPlaylist />
      <div className="content__playlist playlist">
        <TrackOfPlaylist
          nameOfTheSong="Guilt"
          additionToTheSong=""
          singer="Nero"
          musicAlbum="Welcome Reality"
          trackDuration="4:44"
        />
        <TrackOfPlaylist
          nameOfTheSong="Elektro"
          additionToTheSong=""
          singer="Dynoro, Outwork, Mr. Gee"
          musicAlbum="Elektro"
          trackDuration="2:22"
        />
        <TrackOfPlaylist
          nameOfTheSong="I’m Fire"
          additionToTheSong=""
          singer="Ali Bakgor"
          musicAlbum="I’m Fire"
          trackDuration="2:22"
        />
        <TrackOfPlaylist
          nameOfTheSong="Non Stop"
          additionToTheSong="(Remix)"
          singer="Стоункат, Psychopath"
          musicAlbum="Non Stop"
          trackDuration="4:12"
        />
        <TrackOfPlaylist
          nameOfTheSong="Run Run"
          additionToTheSong="(feat. AR/CO)"
          singer="Jaded, Will Clarke, AR/CO"
          musicAlbum="Run Run"
          trackDuration="2:54"
        />
        <TrackOfPlaylist
          nameOfTheSong="Eyes on Fire"
          additionToTheSong="(Zeds Dead Remix)"
          singer="Blue Foundation, Zeds Dead"
          musicAlbum="Eyes on Fire"
          trackDuration="5:20"
        />
        <TrackOfPlaylist
          nameOfTheSong="Mucho Bien"
          additionToTheSong="(Hi Profile Remix)"
          singer="HYBIT, Mr. Black, Offer Nissim, Hi Profile"
          musicAlbum="Mucho Bien"
          trackDuration="3:41"
        />
        <TrackOfPlaylist
          nameOfTheSong="Knives n Cherries"
          additionToTheSong=""
          singer="minthaze"
          musicAlbum="Captivating"
          trackDuration="1:48"
        />
        <TrackOfPlaylist
          nameOfTheSong="Knives n Cherries"
          additionToTheSong=""
          singer="minthaze"
          musicAlbum="Captivating"
          trackDuration="1:48"
        />
        <TrackOfPlaylist
          nameOfTheSong="Knives n Cherries"
          additionToTheSong=""
          singer="minthaze"
          musicAlbum="Captivating"
          trackDuration="1:48"
        />
        <TrackOfPlaylist
          nameOfTheSong="Knives n Cherries"
          additionToTheSong=""
          singer="minthaze"
          musicAlbum="Captivating"
          trackDuration="1:48"
        />
        <TrackOfPlaylist
          nameOfTheSong="Knives n Cherries"
          additionToTheSong=""
          singer="minthaze"
          musicAlbum="Captivating"
          trackDuration="1:48"
        />
        <TrackOfPlaylist
          nameOfTheSong="Knives n Cherries"
          additionToTheSong=""
          singer="minthaze"
          musicAlbum="Captivating"
          trackDuration="1:48"
        />
        <TrackOfPlaylist
          nameOfTheSong="Knives n Cherries"
          additionToTheSong=""
          singer="minthaze"
          musicAlbum="Captivating"
          trackDuration="1:48"
        />
        <TrackOfPlaylist
          nameOfTheSong="How Deep Is Your Love"
          additionToTheSong=""
          singer="Calvin Harris, Disciples"
          musicAlbum="How Deep Is Your Love"
          trackDuration="3:32"
        />
        <TrackOfPlaylist
          nameOfTheSong="Morena"
          additionToTheSong=""
          singer="Tom Boxer"
          musicAlbum="Soundz Made in Romania"
          trackDuration="3:36"
        />
        <TrackOfPlaylist
          nameOfTheSong=""
          additionToTheSong=""
          singer=""
          musicAlbum=""
          trackDuration=""
        />
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

function TrackOfPlaylist(props) {
  return (
    <div className="playlist__item">
      <div className="playlist__track track">
        <div className="track__title">
          <div className="track__title-image">
            <svg className="track__title-svg" alt="music">
              <use xlinkHref="img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className="track__title-text">
            <a className="track__title-link" href="http://">
              {props.nameOfTheSong}
              <span className="track__title-span">
                {props.additionToTheSong}
              </span>
            </a>
          </div>
        </div>
        <div className="track__author">
          <a className="track__author-link" href="http://">
            {props.singer}
          </a>
        </div>
        <div className="track__album">
          <a className="track__album-link" href="http://">
            {props.musicAlbum}
          </a>
        </div>
        <div className="track__time">
          <svg className="track__time-svg" alt="time">
            <use xlinkHref="img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className="track__time-text">{props.trackDuration}</span>
        </div>
      </div>
    </div>
  );
}
