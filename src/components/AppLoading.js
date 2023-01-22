import * as SplashScreen from "expo-splash-screen";
import { Fragment, useEffect } from "react";

import { useCachedResources } from "../hooks/useCachedResources";

SplashScreen.preventAutoHideAsync();

export const AppLoading = ({ children }) => {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    if (isLoadingComplete) {
      SplashScreen.hideAsync();
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
};
