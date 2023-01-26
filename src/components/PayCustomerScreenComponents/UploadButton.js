import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import {
  setReceiptReceiverId,
  setReceiptReceiverImage,
} from "../../store/slice/userSlice";

const UploadButton = ({ onPress, title, type }) => {
  const rri = useSelector((state) => state.user.receiptReceiverImage);
  // console.log("🚀 ~ file: UploadButton.js:16 ~ UploadButton ~ rri", rri);
  const rrii = useSelector((state) => state.user.receiptReceiverId);
  // console.log("🚀 ~ file: UploadButton.js:18 ~ UploadButton ~ ab", ab)
  const dispatch = useDispatch();

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
      if (type === "receiverImage") {
        console.log("setting sender image");
        dispatch(setReceiptReceiverImage(result.assets[0]));
      }
      if (type === "receiverId") {
        dispatch(setReceiptReceiverId(result.assets[0]));
      }
    }
  }

  if (type === "receiverImage") {
    return (
      <View style={styles.root}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.bg}>
            <View>
              <Text
                numberOfLines={1}
                style={rri ? [styles.title, { color: "black" }] : styles.title}
              >
                {rri ? `${title} uploaded` : title}
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

  if (type === "receiverId") {
    return (
      <View style={styles.root}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.bg}>
            <View>
              <Text
                numberOfLines={1}
                style={rrii ? [styles.title, { color: "black" }] : styles.title}
              >
                {rrii ? `${title} uploaded` : title}
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
