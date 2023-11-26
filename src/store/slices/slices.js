import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //массив самих треков?
  trackList: [],
  chosenTrack: null,
  isPlaying: false,
  isShuffled: false,
  shuffledTrackList: [],
  myTrackList: [],
  isLiked: false,
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
  },
});

export const {
  chooseCurrentTrack,
  playNextTrack,
  playPrevTrack,
  getShuffledTrackList,
  playTrack,
  pauseTrack,
} = trackSlice.actions;
export default trackSlice.reducer;

// const { data: apiTracks, error, isLoading } = useGetMainPlaylistQuery()
