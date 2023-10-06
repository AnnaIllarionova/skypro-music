import { tracksList } from "../playlist/tracklist";
import { useState } from "react";
import * as S from "./fitter-tracks.styled";

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
    <S.CenterblockFilter className="filter">
      <S.FilterTitle className="filter__title">Искать по:</S.FilterTitle>
      <div className="filter__list">
        <S.FilterButton
          className="button-author _btn-text"
          onClick={handleIsAuthorClicked}
          isAuthorClicked={isAuthorClicked}
        >
          исполнителю
        </S.FilterButton>
        {isAuthorClicked && <ListOfAuthors />}
      </div>
      <div className="filter__list">
        <S.FilterButton
          className="button-year _btn-text"
          onClick={handleIsYearClicked}
          isYearClicked={isYearClicked}
        >
          году выпуска
        </S.FilterButton>
        {isYearClicked && <ListOfYears />}
      </div>

      <div className="filter__list">
        <S.FilterButton
          className="button-genre _btn-text"
          onClick={handleIsGenreClicked}
          isGenreClicked={isGenreClicked}
        >
          жанру
        </S.FilterButton>
        {isGenreClicked && <ListOfGenre />}
      </div>
    </S.CenterblockFilter>
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
    <S.FilterBoxLinksItem key={author}>{author}</S.FilterBoxLinksItem>
  ));

  return (
    <S.FilterBox>
      <S.FilterBoxLinks>{authorsList}</S.FilterBoxLinks>
    </S.FilterBox>
  );
}

function ListOfYears() {
  return (
    <S.FilterBox>
      <S.FilterBoxLinks>
        <S.FilterBoxLinksItem>По умолчанию</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem>Сначала новые</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem>Сначала старые</S.FilterBoxLinksItem>
      </S.FilterBoxLinks>
    </S.FilterBox>
  );
}

function ListOfGenre() {
  return (
    <S.FilterBox>
      <S.FilterBoxLinks>
        <S.FilterBoxLinksItem>Хип-хоп</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem>Поп</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem>Техно</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem>Инди</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem>Рок</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem>Шансон</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem>Классика</S.FilterBoxLinksItem>
      </S.FilterBoxLinks>
    </S.FilterBox>
  );
}
