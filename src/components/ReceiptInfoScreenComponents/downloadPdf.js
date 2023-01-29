import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";

function downloadFile(link) {
  let fileUri = FileSystem.documentDirectory + "small.mp4";
  FileSystem.downloadAsync(link, fileUri)
    .then(({ uri }) => {
      
    })
    .catch((error) => {
      console.error(error);
    });
}

saveFile = async (fileUri) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
  }
};
