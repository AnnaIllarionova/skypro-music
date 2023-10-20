export async function getAllTrackFromApi() {
  const response = await fetch(
    "https://skypro-music-api.skyeng.tech/catalog/track/all/",
  );
  if (!response.ok) {
    throw new Error("Произошла ошибка");
  }
  const data = await response.json();
  return data;
}

export async function getOneTrack({id}) {
  const response = await fetch(
    `https://skypro-music-api.skyeng.tech/catalog/track/${id}`,
  );
  if (!response.ok) {
    throw new Error("Произошла ошибка");
  }
  const data = await response.json();
  return data;
}
