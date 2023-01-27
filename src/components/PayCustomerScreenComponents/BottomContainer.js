import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import { useSelector } from "react-redux";
import CreateReceipt from "./CreateReceipt";

const BottomContainer = ({ data }) => {
  console.log("🚀 ~ file: BottomContainer.js:9 ~ BottomContainer ~ data", data);
  return (
    <View style={styles.root}>
      <View
        style={{
          flex: 1,
          width: layout.widthp,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "poppins-semibold",
            fontSize: 24,
          }}
        >
          Details
        </Text>
      </View>
      <View
        style={{
          flex: 3,
          alignItems: "center",
          justifyContent: "center",
          maxHeight: 120,
          width: layout.widthp,
        }}
      >
        <Image
          source={{
            uri: data?.receiver_image,
          }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
      </View>
      <View
        style={{
          flex: 4,
          width: layout.widthp,
          marginTop: 20,
        }}
      >
        <Text style={styles.title}>
          Amount - <Text style={{ color: colors.green }}>{data?.amount}</Text>
        </Text>
        <Text style={styles.title}>
          Receiver Name -{" "}
          <Text style={{ color: colors.green }}>{data?.receiver_name}</Text>
        </Text>
      </View>
      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
          minHeight: 100,
        }}
      >
        <Text style={styles.title}>ID Card</Text>
        <Image
          style={{ height: 200, width: 300, alignSelf: "center" }}
          source={{
            uri: `http://codelumina.com/project/wallet_managment/public/${data?.reciver_id_image}`,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default BottomContainer;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: layout.width,
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 20,
  },
});
