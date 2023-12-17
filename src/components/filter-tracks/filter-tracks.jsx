import { useState } from "react";
import * as S from "./fitter-tracks.styled";
import { useThemeContext } from "../context/theme-context";
import { useGetAllTracksQuery } from "../../services/api-services";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredTracklist,
  getSortedTracklistDefault,
  getSortedTracklistNewOld,
  getSortedTracklistOldNew,
  setAuthorsFilter,
  setAuthorsFilterArr,
} from "../../store/slices/slices";
import { useEffect } from "react";

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
  const { data: trackList } = useGetAllTracksQuery();
  const dispatch = useDispatch();
  const isAuthor = useSelector((state) => state.track.isAuthor);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const authorsFilter = useSelector((state) => state.track.authorsFilter);
  const selectedAuthorsFilter = useSelector(
    (state) => state.track.selectedAuthorsFilter,
  );

  const handleFilter = ({ author }) => {
    dispatch(getFilteredTracklist({ author, playlist: trackList }));
    console.log(author);
    if (selectedAuthorsFilter.includes(author)) {
      setSelectedAuthor(author);
    }

    dispatch(setAuthorsFilterArr({ author }));
  };

  useEffect(() => {
    trackList.forEach((track) => {
      dispatch(setAuthorsFilter(track.author));
    });
  }, []);

  const authorsList = authorsFilter
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    .map((author) => (
      <S.FilterBoxLinksItem
        theme={theme}
        key={author}
        isAuthor={isAuthor}
        isAuthorSelected={selectedAuthor === author}
        onClick={() => handleFilter({ author })}
      >
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

function ListOfYears({ theme }) {
  const { data: trackList } = useGetAllTracksQuery();
  const dispatch = useDispatch();
  const isDateOfRelease = useSelector((state) => state.track.isDateOfRelease);
  const [selectedFilter, setSelectedFilter] = useState(null);

  // const dates = [];
  // trackList.forEach((track) => {
  //   if (track.release_date !== null) {
  //     dates.push(track.release_date);
  //   }
  // });
  // const splitDates = dates.map((date) => date.split("-"));
  // const years = splitDates.map((date) => date[0]);
  // const fullYears = [];
  // years.forEach((year) => {
  //   if (!fullYears.includes(year)) {
  //     fullYears.push(year);
  //   }
  // });
  // const datesOfRelease = fullYears.map((year) => (
  //   <S.FilterBoxLinksItem theme={theme} key={year}>
  //     {year}
  //   </S.FilterBoxLinksItem>
  // ));

  // const sortDatesOfRelease = datesOfRelease.sort((a, b) =>
  //   a.key > b.key ? 1 : -1,
  // );
  const filters = ["По умолчанию", "Сначала новые", "Сначала старые"];

  const handleFilterByReleaseDate = ({ filter }) => {
    if (filter === "Сначала старые") {
      dispatch(getSortedTracklistOldNew({ playlist: trackList }));
    }
    if (filter === "Сначала новые") {
      dispatch(getSortedTracklistNewOld({ playlist: trackList }));
    }
    if (filter === "По умолчанию") {
      dispatch(getSortedTracklistDefault({ playlist: trackList }));
    }
    setSelectedFilter(filter);
  };

  const filtersByDate = filters.map((filter) => (
    <S.FilterBoxLinksItem
      theme={theme}
      key={filter}
      onClick={() => handleFilterByReleaseDate({ filter })}
      isDateOfRelease={isDateOfRelease}
      isSelected={selectedFilter === filter}
    >
      {filter}
    </S.FilterBoxLinksItem>
  ));
  return (
    <S.FilterBox theme={theme}>
      <S.FilterBoxLinks>{filtersByDate}</S.FilterBoxLinks>
    </S.FilterBox>
  );
}

function ListOfGenre({ theme }) {
  const { data: trackList } = useGetAllTracksQuery();
  const genres = [];
  trackList.forEach((track) => {
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
