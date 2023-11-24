import { useState } from "react";
import * as S from "./fitter-tracks.styled";
import { useThemeContext } from "../context/theme-context";

export function FilterTracks({ apiTracks }) {
  const { theme } = useThemeContext();
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
    <S.CenterblockFilter>
      <S.FilterTitle theme={theme}>Искать по:</S.FilterTitle>
      <div className="filter__list">
        <S.FilterButton
          theme={theme}
          onClick={handleIsAuthorClicked}
          isAuthorClicked={isAuthorClicked}
        >
          исполнителю
        </S.FilterButton>
        {isAuthorClicked && <ListOfAuthors apiTracks={apiTracks} />}
      </div>
      <div className="filter__list">
        <S.FilterButton
          theme={theme}
          onClick={handleIsYearClicked}
          isYearClicked={isYearClicked}
        >
          году выпуска
        </S.FilterButton>
        {isYearClicked && <ListOfYears theme={theme} apiTracks={apiTracks} />}
      </div>

      <div className="filter__list">
        <S.FilterButton
          theme={theme}
          onClick={handleIsGenreClicked}
          isGenreClicked={isGenreClicked}
        >
          жанру
        </S.FilterButton>
        {isGenreClicked && <ListOfGenre theme={theme} apiTracks={apiTracks} />}
      </div>
    </S.CenterblockFilter>
  );
}

function ListOfAuthors({ apiTracks }) {
  const { theme } = useThemeContext();
  const authors = [];

  apiTracks.forEach((track) => {
    if (!authors.includes(track.author)) {
      authors.push(track.author);
    }
  });

  const authorsList = authors.map((author) => (
    <S.FilterBoxLinksItem theme={theme} key={author}>
      {author}
    </S.FilterBoxLinksItem>
  ));

  const sortAuthorsList = authorsList.sort((a, b) => (a.key > b.key ? 1 : -1));

  return (
    <S.FilterBox theme={theme}>
      <S.FilterBoxLinks theme={theme}>{sortAuthorsList}</S.FilterBoxLinks>
    </S.FilterBox>
  );
}

function ListOfYears({ theme, apiTracks }) {
  const dates = [];
  apiTracks.forEach((track) => {
    if (track.release_date !== null) {
      dates.push(track.release_date);
    }
  });
  const splitDates = dates.map((date) => date.split("-"));
  const years = splitDates.map((date) => date[0]);
  const fullYears = [];
  years.forEach((year) => {
    if (!fullYears.includes(year)) {
      fullYears.push(year);
    }
  });
  const datesOfRelease = fullYears.map((year) => (
    <S.FilterBoxLinksItem theme={theme} key={year}>
      {year}
    </S.FilterBoxLinksItem>
  ));

  const sortDatesOfRelease = datesOfRelease.sort((a, b) =>
    a.key > b.key ? 1 : -1,
  );
  return (
    <S.FilterBox theme={theme}>
      <S.FilterBoxLinks>{sortDatesOfRelease}</S.FilterBoxLinks>
    </S.FilterBox>
  );
}

function ListOfGenre({ theme, apiTracks }) {
  const genres = [];
  apiTracks.forEach((track) => {
    if (!genres.includes(track.genre)) {
      genres.push(track.genre);
    }
  });
  const listOfGenres = genres.map((genre) => (
    <S.FilterBoxLinksItem theme={theme} key={genre}>
      {genre}
    </S.FilterBoxLinksItem>
  ));

  return (
    <S.FilterBox theme={theme}>
      <S.FilterBoxLinks>{listOfGenres}</S.FilterBoxLinks>
    </S.FilterBox>
  );
}
