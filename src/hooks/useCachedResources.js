import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

export const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          "poppins-regular": require("../../assets/fonts/Poppins/Poppins-Regular.ttf"),
          "poppins-medium": require("../../assets/fonts/Poppins/Poppins-Medium.ttf"),
          "poppins-semibold": require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
          "inter-regular": require("../../assets/fonts/inter/Inter-Regular.ttf"),
          "inter-medium": require("../../assets/fonts/inter/Inter-Medium.ttf"),
          "inter-semibold": require("../../assets/fonts/inter/Inter-SemiBold.ttf"),
          "inter-bold": require("../../assets/fonts/inter/Inter-Bold.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};
