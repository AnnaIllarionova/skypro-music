import { tracksList } from "../playlist/tracklist";
import { useState } from "react";
import * as S from "./fitter-tracks.styled";
import { useThemeContext } from "../context/theme-context";

export function FilterTracks() {
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
        {isAuthorClicked && <ListOfAuthors />}
      </div>
      <div className="filter__list">
        <S.FilterButton
          theme={theme}
          onClick={handleIsYearClicked}
          isYearClicked={isYearClicked}
        >
          году выпуска
        </S.FilterButton>
        {isYearClicked && <ListOfYears theme={theme} />}
      </div>

      <div className="filter__list">
        <S.FilterButton
          theme={theme}
          onClick={handleIsGenreClicked}
          isGenreClicked={isGenreClicked}
        >
          жанру
        </S.FilterButton>
        {isGenreClicked && <ListOfGenre theme={theme} />}
      </div>
    </S.CenterblockFilter>
  );
}

function ListOfAuthors() {
  const { theme } = useThemeContext();
  const authors = [];

  tracksList.forEach((track) => {
    if (!authors.includes(track.singer)) {
      authors.push(track.singer);
    }
  });

  const authorsList = authors.map((author) => (
    <S.FilterBoxLinksItem theme={theme} key={author}>
      {author}
    </S.FilterBoxLinksItem>
  ));

  return (
    <S.FilterBox theme={theme}>
      <S.FilterBoxLinks theme={theme}>{authorsList}</S.FilterBoxLinks>
    </S.FilterBox>
  );
}

function ListOfYears({ theme }) {
  return (
    <S.FilterBox theme={theme}>
      <S.FilterBoxLinks>
        <S.FilterBoxLinksItem theme={theme}>По умолчанию</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem theme={theme}>Сначала новые</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem theme={theme}>
          Сначала старые
        </S.FilterBoxLinksItem>
      </S.FilterBoxLinks>
    </S.FilterBox>
  );
}

function ListOfGenre({ theme }) {
  return (
    <S.FilterBox theme={theme}>
      <S.FilterBoxLinks>
        <S.FilterBoxLinksItem theme={theme}>Хип-хоп</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem theme={theme}>Поп</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem theme={theme}>Техно</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem theme={theme}>Инди</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem theme={theme}>Рок</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem theme={theme}>Шансон</S.FilterBoxLinksItem>
        <S.FilterBoxLinksItem theme={theme}>Классика</S.FilterBoxLinksItem>
      </S.FilterBoxLinks>
    </S.FilterBox>
  );
}
