import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigator from "./src/navigator/Navigator";
import { AppLoading } from "./src/components/AppLoading";
import { Provider } from "react-redux";
import { store } from "./src/store";

export default function App() {
  return (
    <AppLoading>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </AppLoading>
  );
}
