import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {
  setReceiverIdImage,
  setReceiverImage,
  setSenderIdImage,
  setSenderImage,
} from "../../store/slice/userSlice";

const UploadButton = ({ onPress, title, type }) => {
  const si = useSelector((state) => state.user.senderImage);
  console.log("🚀 ~ file: UploadButton.js:16 ~ UploadButton ~ si", si);
  const sii = useSelector((state) => state.user.senderIdImage);
  // console.log("🚀 ~ file: UploadButton.js:18 ~ UploadButton ~ ab", ab)

  async function pickImage() {
    console.log("test");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      if (type === "senderImage") {
        console.log("setting sender image");
        dispatch(setSenderImage(result.assets[0]));
      }
      if (type === "senderIdImage") {
        dispatch(setSenderIdImage(result.assets[0]));
      }
      if (type === "receiverImage") {
        dispatch(setReceiverImage(result.assets[0]));
      }
      if (type === "receiverIdImage") {
        dispatch(setReceiverIdImage(result.assets[0]));
      }
    }
  }

  if (type === "senderImage") {
    return (
      <View style={styles.root}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.bg}>
            <View>
              <Text
                numberOfLines={1}
                style={si ? [styles.title, { color: "black" }] : styles.title}
              >
                {si ? `${title} uploaded` : title}
              </Text>
            </View>
            <View>
              <Feather name="upload" size={24} color={colors.gray} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  if (type === "senderIdImage") {
    return (
      <View style={styles.root}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.bg}>
            <View>
              <Text
                numberOfLines={1}
                style={sii ? [styles.title, { color: "black" }] : styles.title}
              >
                {sii ? `${title} uploaded` : title}
              </Text>
            </View>
            <View>
              <Feather name="upload" size={24} color={colors.gray} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

export default UploadButton;

const styles = StyleSheet.create({
  root: {
    width: layout.widthp,
    alignItems: "center",
    justifyContent: "center",
    height: 68,
    width: layout.width,
    // backgroundColor:'pink'
  },
  bg: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    justifyContent: "space-between",
    width: layout.widthp,
    flexDirection: "row",
    paddingHorizontal: 10,
    elevation: 6,
  },
  title: {
    fontFamily: "inter-semibold",
    fontSize: 16,
    color: "rgba(181,181,181,255)",
    // paddingLeft: 10,
    // color:colors.gray
  },
});
