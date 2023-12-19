import { useState } from "react";
import * as S from "./fitter-tracks.styled";
import { useThemeContext } from "../context/theme-context";
import { useGetAllTracksQuery } from "../../services/api-services";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredTracklist,
  getFilteredTracklistByGenre,
  getSortedTracklistDefault,
  getSortedTracklistNewOld,
  getSortedTracklistOldNew,
  removeAuthorsFilterArr,
  removeGenreFilterArr,
  setAuthorsFilter,
  setAuthorsFilterArr,
  setGenreFilter,
  setGenreFilterArr,
} from "../../store/slices/slices";
import { useEffect } from "react";

export function FilterTracks() {
  const { theme } = useThemeContext();
  const [isAuthorClicked, setIsAuthorClicked] = useState(false);
  const [isYearClicked, setIsYearClicked] = useState(false);
  const [isGenreClicked, setIsGenreClicked] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const dispatch = useDispatch();
  const { data: trackList, isLoading } = useGetAllTracksQuery();
  const selectedAuthorsFilter = useSelector(
    (state) => state.track.selectedAuthorsFilter,
  );
  const selectedGenreFilter = useSelector(
    (state) => state.track.selectedGenreFilter,
  );
  const authors = !isLoading
    ? [...new Set(trackList.map((track) => track.author))]
    : [];

  const genres = !isLoading
    ? [...new Set(trackList.map((track) => track.genre))]
    : [];
  useEffect(() => {
    dispatch(setAuthorsFilter(authors));
    dispatch(setGenreFilter(genres));
  }, [trackList]);

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
      <S.FilterList>
        {selectedAuthorsFilter.length > 0 ? (
          <S.FilterButtonNumber>
            {selectedAuthorsFilter.length}
          </S.FilterButtonNumber>
        ) : null}

        <S.FilterButton
          theme={theme}
          onClick={handleIsAuthorClicked}
          isAuthorClicked={isAuthorClicked}
        >
          исполнителю
        </S.FilterButton>

        {isAuthorClicked && (
          <ListOfAuthors
            theme={theme}
            selectedAuthorsFilter={selectedAuthorsFilter}
            tracksData={isLoading ? ["Загрузка треков..."] : [...trackList]}
          />
        )}
      </S.FilterList>
      <S.FilterList>
        <S.FilterButton
          theme={theme}
          onClick={handleIsYearClicked}
          isYearClicked={isYearClicked}
        >
          году выпуска
        </S.FilterButton>
        {isYearClicked && (
          <ListOfYears
            theme={theme}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        )}
      </S.FilterList>

      <S.FilterList>
        {selectedGenreFilter.length > 0 ? (
          <S.FilterButtonNumber>
            {selectedGenreFilter.length}
          </S.FilterButtonNumber>
        ) : null}
        <S.FilterButton
          theme={theme}
          onClick={handleIsGenreClicked}
          isGenreClicked={isGenreClicked}
        >
          жанру
        </S.FilterButton>
        {isGenreClicked && (
          <ListOfGenre
            selectedGenreFilter={selectedGenreFilter}
            theme={theme}
            tracksData={isLoading ? ["Загрузка треков..."] : [...trackList]}
          />
        )}
      </S.FilterList>
    </S.CenterblockFilter>
  );
}

function ListOfAuthors({ tracksData, selectedAuthorsFilter }) {
  const { theme } = useThemeContext();

  const dispatch = useDispatch();
  const isAuthor = useSelector((state) => state.track.isAuthor);
  const authorsFilter = useSelector((state) => state.track.authorsFilter);

  const handleFilter = ({ author }) => {
    if (selectedAuthorsFilter.includes(author)) {
      dispatch(removeAuthorsFilterArr(author));
    } else {
      dispatch(setAuthorsFilterArr(author));
    }
    dispatch(
      getFilteredTracklist({
        author: selectedAuthorsFilter,
        playlist: tracksData,
      }),
    );
  };
  // console.log(selectedAuthorsFilter.length);
  const authorsList = authorsFilter
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    .map((author) => (
      <S.FilterBoxLinksItem
        theme={theme}
        key={author}
        isAuthor={isAuthor}
        isAuthorSelected={selectedAuthorsFilter.includes(author)}
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

function ListOfYears({ theme, selectedFilter, setSelectedFilter }) {
  const { data: trackList } = useGetAllTracksQuery();
  const dispatch = useDispatch();
  const isDateOfRelease = useSelector((state) => state.track.isDateOfRelease);

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
  // const years = [DEFAULT_SORT_VALUE, ASC_SORT_VALUE, DESC_SORT_VALUE]
  // const DEFAULT_SORT_VALUE = 'По умолчанию' const ASC_SORT_VALUE = 'Сначала старые' const DESC_SORT_VALUE = 'Сначала новые'
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

function ListOfGenre({ theme, tracksData, selectedGenreFilter }) {
  const genreFilter = useSelector((state) => state.track.genreFilter);
  const isGenre = useSelector((state) => state.track.isGenre);
  const dispatch = useDispatch();

  const handleGenreFilter = ({ genre }) => {
    if (selectedGenreFilter.includes(genre)) {
      dispatch(removeGenreFilterArr(genre));
    } else {
      dispatch(setGenreFilterArr(genre));
    }
    dispatch(
      getFilteredTracklistByGenre({
        genre: selectedGenreFilter,
        playlist: tracksData,
      }),
    );
  };
  // console.log(selectedGenreFilter);
  const listOfGenres = genreFilter
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    })
    .map((genre) => (
      <S.FilterBoxLinksItem
        onClick={() => handleGenreFilter({ genre })}
        isGenre={isGenre}
        isGenreSelected={selectedGenreFilter.includes(genre)}
        theme={theme}
        key={genre}
      >
        {genre}
      </S.FilterBoxLinksItem>
    ));

  return (
    <S.FilterBox theme={theme}>
      <S.FilterBoxLinks>{listOfGenres}</S.FilterBoxLinks>
    </S.FilterBox>
  );
}
