import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/navigator/Navigator";
import { AppLoading } from "./src/components/AppLoading";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {
  return (
    <AppLoading>
      <Provider store={store}>
        <MenuProvider>
          <Navigator />
        </MenuProvider>
      </Provider>
    </AppLoading>
  );
}
