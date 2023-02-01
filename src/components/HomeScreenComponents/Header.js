import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import BackButton from "../BackButton";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Storage from "../../utils/expireStorage";

const Header = ({ back, loc }) => {
  const [name, setName] = useState();
  const navigation = useNavigation();

  async function getName() {
    // const result = await SecureStore.getItemAsync("id");
    let result = await Storage.getItem("id");
    axios
      .post("http://codelumina.com/project/wallet_managment/api/user/profile", {
        userid: result,
      })
      .then((res) => {
        console.log(res.data);
        setName(res.data.data.name);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  useEffect(() => {
    getName();
  }, []);

  function drawer() {
    navigation.openDrawer();
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: layout.width,
        height: 40,
      }}
    >
      <View style={[styles.root]}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={drawer}>
            <Ionicons name="menu" size={24} color="#230B34" />
          </TouchableOpacity>
        </View>
        {/* <BackButton onPress={back} /> */}
        <Text style={styles.title}>{name ? name : "Welcome!"}</Text>
        <View style={{ height: 35, width: 35 }} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: layout.widthp + 10,
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "pink",
    backgroundColor: "#49D7E5",
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 24.33,
    fontFamily: "poppins-semibold",
    textAlign: "center",
    // backgroundColor: "pink",
  },
  iconContainer: {
    borderWidth: 2,
    borderColor: "rgba(24, 26, 32, 0.1)",
    borderRadius: 10,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});
