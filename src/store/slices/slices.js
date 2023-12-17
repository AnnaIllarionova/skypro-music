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

  genreFilter: [],
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
    setAuthorsFilterArr: (state, action) => {
      const { author } = action.payload;
      if (!state.selectedAuthorsFilter.includes(author)) {
        state.selectedAuthorsFilter = [...state.selectedAuthorsFilter, author];
      } else {
        state.selectedAuthorsFilter = state.selectedAuthorsFilter.filter(
          (selectedAuthor) => selectedAuthor !== author,
        );
      }
      console.log(state.selectedAuthorsFilter);
    },
    getFilteredTracklist: (state, action) => {
      // const { author } = action.payload;
      state.trackList = action.payload.playlist;

      if (state.selectedAuthorsFilter.length > 0) {
        state.isAuthor = true;

        state.filteredTracklist = state.trackList.filter((track) =>
          state.selectedAuthorsFilter.every((author) =>
            track.author.includes(author),
          ),
        );
      } else {
        state.isAuthor = false;
        state.filteredTracklist = state.trackList;
      }
      // console.log(author);
      console.log(state.selectedAuthorsFilter.length );
      console.log(state.isAuthor);
      console.log(state.filteredTracklist);
      console.log(state.trackList);
      console.log(state.selectedAuthorsFilter);
    },
    setAuthorsFilter: (state, action) => {
      state.authorsFilter.push(action.payload);
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
} = trackSlice.actions;
export default trackSlice.reducer;
