import { tracksList } from "../playlist/tracklist";
import "./filter-tracks.css";
import { useState } from "react";

export function FilterTracks() {
  const [isAuthorClicked, setIsAuthorClicked] = useState(false);
  const [isYearClicked, setIsYearClicked] = useState(false);
  const [isGenreClicked, setIsGenreClicked] = useState(false);

  function handleIsAuthorClicked() {
    setIsAuthorClicked(!isAuthorClicked);
    setIsYearClicked(false);
    setIsGenreClicked(false);
  }

  function handleIsYearClicked() {
    setIsAuthorClicked(false);
    setIsYearClicked(!isYearClicked);
    setIsGenreClicked(false);
  }

  function handleIsGenreClicked() {
    setIsAuthorClicked(false);
    setIsYearClicked(false);
    setIsGenreClicked(!isGenreClicked);
  }

  return (
    <div className="centerblock__filter filter">
      <div className="filter__title">Искать по:</div>
      <div className="filter__list">
        <div
          className="filter__button button-author _btn-text"
          onClick={handleIsAuthorClicked}
          style={
            isAuthorClicked
              ? {
                  borderColor: "#9A48F1",
                  color: "#B672FF",
                }
              : {}
          }
        >
          исполнителю
        </div>
        {isAuthorClicked && <ListOfAuthors />}
      </div>
      <div className="filter__list">
        <div
          className="filter__button button-year _btn-text"
          onClick={handleIsYearClicked}
          style={
            isYearClicked
              ? {
                  borderColor: "#9A48F1",
                  color: "#B672FF",
                }
              : {}
          }
        >
          году выпуска
        </div>
        {isYearClicked && <ListOfYears />}
      </div>

      <div className="filter__list">
        <div
          className="filter__button button-genre _btn-text"
          onClick={handleIsGenreClicked}
          style={
            isGenreClicked
              ? {
                  borderColor: "#9A48F1",
                  color: "#B672FF",
                }
              : {}
          }
        >
          жанру
        </div>
        {isGenreClicked && <ListOfGenre />}
      </div>
    </div>
  );
}

function ListOfAuthors() {
  const authors = [];

  tracksList.forEach((track) => {
    if (!authors.includes(track.singer)) {
      authors.push(track.singer);
    }
  });

  const authorsList = authors.map((author) => (
    <a className="filter-box__links_item" key={author}>
      {author}
    </a>
  ));

  return (
    <div className="filter-box">
      <div className="filter-box__links">{authorsList}</div>
    </div>
  );
}

function ListOfYears() {
  return (
    <div className="filter-box">
      <div className="filter-box__links">
        <a className="filter-box__links_item">По умолчанию</a>
        <a className="filter-box__links_item">Сначала новые</a>
        <a className="filter-box__links_item">Сначала старые</a>
      </div>
    </div>
  );
}

function ListOfGenre() {
  return (
    <div className="filter-box">
      <div className="filter-box__links">
        <a className="filter-box__links_item">Хип-хоп</a>
        <a className="filter-box__links_item">Поп</a>
        <a className="filter-box__links_item">Техно</a>
        <a className="filter-box__links_item">Инди</a>
        <a className="filter-box__links_item">Рок</a>
        <a className="filter-box__links_item">Шансон</a>
        <a className="filter-box__links_item">Классика</a>
      </div>
    </div>
  );
}
