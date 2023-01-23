import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import publicIP from "react-native-public-ip";
import Header from "../../components/DetailScreenComponents/Header";
import Input from "../../components/DetailScreenComponents/Input";
import Fields from "../../components/DetailScreenComponents/Fields";

const DetailScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    publicIP()
      .then((ip) => {
        console.log(ip);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      {/* <Text>{text}</Text> */}
      <View style={styles.fieldContainer}>
        <Fields />
      </View>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fieldContainer: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
  },
});
