export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const reminingSeconds = Math.floor(seconds % 60);
    const formatedSeconds =
      reminingSeconds < 10 ? "0" + reminingSeconds : reminingSeconds;
    return minutes + "." + formatedSeconds;
  };
