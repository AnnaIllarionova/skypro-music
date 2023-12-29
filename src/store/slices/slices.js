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
  currentPage: null,
  currentPageTracks: null,
};

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    chooseCurrentTrack: (state, action) => {
      state.chosenTrack = action.payload.track;
      state.trackList = action.payload.playlist;
    },
    playNextTrack: (state) => {
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

      if (state.isShuffled === true) {
        state.shuffledTrackList = [...state.trackList].sort(
          () => Math.random() - 0.5,
        );
      } else {
        state.shuffledTrackList = [];
      }

      console.log(`Shuffled:  ${state.isShuffled}`);
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload.currentPage;
    
    },
    setCurrentPageTracks: (state) => {
      state.currentPageTracks = state.currentPage;
   
    },
    removeIsShuffled: (state) => {
      if(state.currentPage !== state.currentPageTracks) {
        state.isShuffled = false;
        state.shuffledTrackList = [];
      }
      console.log("currentPage", state.currentPage);
      console.log("currentPageTracks", state.currentPageTracks);
    },
    playTrack: (state) => {
      state.isPlaying = true;
    },
    pauseTrack: (state) => {
      state.isPlaying = false;
    },
    stopPlaying: (state) => {
      state.isPlaying = false;
      state.chosenTrack = null;
    },
    getFilteredTracklist: (state, action) => {
      state.trackList = action.payload.playlist;
      if (
        state.selectedAuthorsFilter.length > 0 &&
        state.selectedGenreFilter.length > 0
      ) {
        state.isAuthor = true;
        state.isGenre = true;
        state.filteredTracklist = state.trackList.filter(
          (track) =>
            state.selectedGenreFilter.includes(track.genre) &&
            state.selectedAuthorsFilter.includes(track.author),
        );
      } else if (state.selectedGenreFilter.length > 0) {
        state.isGenre = true;
        state.filteredTracklist = state.trackList.filter((track) =>
          state.selectedGenreFilter.includes(track.genre),
        );
      } else if (state.selectedAuthorsFilter.length > 0) {
        state.isAuthor = true;

        state.filteredTracklist = state.trackList.filter((track) =>
          state.selectedAuthorsFilter.includes(track.author),
        );
      } else {
        state.isAuthor = false;
        state.isGenre = false;
        state.filteredTracklist = state.trackList;
      }
    },
    setAuthorsFilter: (state, action) => {
      state.authorsFilter = action.payload;
    },
    setAuthorsFilterArr: (state, action) => {
      state.selectedAuthorsFilter.push(action.payload);
    },
    removeAuthorsFilterArr: (state, action) => {
      state.selectedAuthorsFilter = state.selectedAuthorsFilter.filter(
        (author) => author !== action.payload,
      );
    },
    setGenreFilter: (state, action) => {
      state.genreFilter = action.payload;
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
    },
    getSortedTracklistNewOld: (state, action) => {
      state.isDateOfRelease = true;
      state.trackList = action.payload.playlist;
      state.filteredTracklist = [...state.trackList]
        .slice()
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    },
    getSortedTracklistDefault: (state) => {
      state.isDateOfRelease = true;
      state.filteredTracklist = state.trackList;
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
  stopPlaying,
  setCurrentPage,
  setCurrentPageTracks,
  removeIsShuffled,
} = trackSlice.actions;
export default trackSlice.reducer;
