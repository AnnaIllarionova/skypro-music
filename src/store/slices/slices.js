import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackList: [],
  chosenTrack: null,
  isPlaying: false,
  isShuffled: false,
  shuffledTrackList: [],
  showAllTracksAsLiked: false,
  filteredTracklist: [],
  isAuthor: false,
  isDateOfRelease: false,
  authorsFilter: [],
  selectedAuthorsFilter: [],
  isGenre: false,
  genreFilter: [],
  selectedGenreFilter: [],
};

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    chooseCurrentTrack: (state, action) => {
      state.chosenTrack = action.payload.track;
      state.trackList = action.payload.playlist;
      // console.log(state.trackList);
    },
    playNextTrack: (state) => {
      //в массиве треков найти этот индекс
      const currentTrackList = state.isShuffled
        ? state.shuffledTrackList
        : state.trackList;
      const currentTrackIndex = currentTrackList.findIndex((track) => {
        return track.id === state.chosenTrack.id;
      });
      const currentTrack = currentTrackList[currentTrackIndex + 1];
      if (currentTrack) {
        state.chosenTrack = currentTrack;
      }
    },
    playPrevTrack: (state) => {
      const currentTrackList = state.isShuffled
        ? state.shuffledTrackList
        : state.trackList;
      const currentTrackIndex = currentTrackList.findIndex(
        (track) => track.id === state.chosenTrack.id,
      );
      const currentTrack = currentTrackList[currentTrackIndex - 1];
      if (currentTrack && currentTrackIndex !== -1) {
        state.chosenTrack = currentTrack;
      }
      if (currentTrackIndex === -1) state.chosenTrack = currentTrackList[0];
    },
    getShuffledTrackList: (state) => {
      state.isShuffled = !state.isShuffled;
      state.shuffledTrackList = [...state.trackList].sort(
        () => Math.random() - 0.5,
      );
      // console.log(state.shuffledTrackList);
      console.log(`Shuffled:  ${state.isShuffled}`);
    },
    playTrack: (state) => {
      state.isPlaying = true;
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    },
    getFilteredTracklist: (state, action) => {
      state.trackList = action.payload.playlist;

      if (state.selectedAuthorsFilter.length > 0) {
        state.isAuthor = true;

        state.filteredTracklist = state.trackList.filter((track) =>
          state.selectedAuthorsFilter.includes(track.author),
        );
      } else {
        state.isAuthor = false;
        state.filteredTracklist = state.trackList;
      }

      // console.log(state.selectedAuthorsFilter.length);
      // console.log(state.isAuthor);
      // console.log(state.filteredTracklist);
      // console.log(state.trackList);
      // console.log(state.selectedAuthorsFilter);
    },
    setAuthorsFilter: (state, action) => {
      state.authorsFilter = action.payload;
      // console.log(state.authorsFilter);
    },
    setAuthorsFilterArr: (state, action) => {
      state.selectedAuthorsFilter.push(action.payload);
    },
    removeAuthorsFilterArr: (state, action) => {
      state.selectedAuthorsFilter = state.selectedAuthorsFilter.filter(
        (author) => author !== action.payload,
      );
    },
    getFilteredTracklistByGenre: (state, action) => {
      state.trackList = action.payload.playlist;
      if (state.selectedGenreFilter.length > 0) {
        state.isGenre = true;
        state.filteredTracklist = state.trackList.filter((track) =>
          state.selectedGenreFilter.includes(track.genre),
        );
      } else {
        state.isGenre = false;
        state.filteredTracklist = state.trackList;
      }
      console.log(state.selectedGenreFilter);
      console.log(state.filteredTracklist);
    },
    setGenreFilter: (state, action) => {
      state.genreFilter = action.payload;
      // console.log(action.payload);
    },
    setGenreFilterArr: (state, action) => {
      state.selectedGenreFilter.push(action.payload);
    },
    removeGenreFilterArr: (state, action) => {
      state.selectedGenreFilter = state.selectedGenreFilter.filter(
        (genre) => genre !== action.payload,
      );
    },
    getSortedTracklistOldNew: (state, action) => {
      state.isDateOfRelease = true;
      state.trackList = action.payload.playlist;
      state.filteredTracklist = [...state.trackList]
        .slice()
        .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      // console.log(state.filteredTracklist);
    },
    getSortedTracklistNewOld: (state, action) => {
      state.isDateOfRelease = true;
      state.trackList = action.payload.playlist;
      state.filteredTracklist = [...state.trackList]
        .slice()
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      // console.log(state.filteredTracklist);
    },
    getSortedTracklistDefault: (state) => {
      state.isDateOfRelease = true;
      state.filteredTracklist = state.trackList;
      // console.log(state.filteredTracklist);
    },
  },
});

export const {
  chooseCurrentTrack,
  playNextTrack,
  playPrevTrack,
  getShuffledTrackList,
  playTrack,
  pauseTrack,
  getFilteredTracklist,
  getSortedTracklistOldNew,
  getSortedTracklistNewOld,
  getSortedTracklistDefault,
  setAuthorsFilter,
  setAuthorsFilterArr,
  removeAuthorsFilterArr,
  setGenreFilter,
  setGenreFilterArr,
  removeGenreFilterArr,
  getFilteredTracklistByGenre,
} = trackSlice.actions;
export default trackSlice.reducer;
