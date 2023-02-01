import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/DetailScreenComponents/Header";
import Input from "../../components/DetailScreenComponents/Input";
import Fields from "../../components/DetailScreenComponents/Fields";
import { StatusBar } from "expo-status-bar";
import Storage from "../../utils/expireStorage";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/slice/userSlice";

const DetailScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkLogin() {
      let result = await Storage.getItem("isLoggedIn");
      console.log("🚀 ~ file: checkLogin.js:21 ~ getValueFor ~ result", result);
      if (result !== "true") {
        dispatch(setLoggedIn(false));
      }
    }

    checkLogin();
  }, []);
  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();

  //   publicIP()
  //     .then((ip) => {
  //       console.log(ip);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
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
    backgroundColor: "white",
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
