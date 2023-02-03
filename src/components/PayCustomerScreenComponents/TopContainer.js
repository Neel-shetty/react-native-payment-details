import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { layout } from "../../constants/layout";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import { setReceiptData } from "../../store/slice/userSlice";
import { useRoute } from "@react-navigation/native";

const TopContainer = () => {
  const [details, setDeatils] = useState();
  const receiptId = useSelector((state) => state.user.receipt);

  const route = useRoute();
  console.log(
    "🚀 ~ file: TopContainer.js:16 ~ TopContainer ~ route",
    route.params.transactionData
  );
  const data = route.params.transactionData;
  console.log("🚀 ~ file: TopContainer.js:21 ~ TopContainer ~ data", data);

  return (
    <View style={styles.root}>
      <View
        style={{
          width: layout.widthp,
          paddingTop: 20,
          paddingLeft: 10,
          flex: 0.5,
          // backgroundColor: "coral",
        }}
      >
        <Text style={{ fontFamily: "poppins-semibold", fontSize: 20 }}>
          Transaction Details
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          width: layout.widthp,
          paddingHorizontal: 10,
          // flexDirection: "row",
          flex: 4,
          // backgroundColor:'pink'
        }}
      >
        <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
          Receiver Image
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "pink",
            height: "100%",
            flex: 1,
            marginBottom: 20,
            minHeight: 120,
            minWidth: 120,
          }}
        >
          <Image
            source={{
              uri:
                "http://codelumina.com/project/wallet_managment/public/" +
                data.receiver_image,
            }}
            style={{ height: 120, width: 120, borderRadius: 75 }}
          />
        </View>
        <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
          Receiver ID Image
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "pink",
            // height: "100%",
            // paddingVertical: 10,
            minHeight: 200,
            flex: 1,
            marginBottom: 20,
          }}
        >
          <Image
            source={{
              uri:
                "http://codelumina.com/project/wallet_managment/public/" +
                data.receiver_id_card_image,
            }}
            style={{
              height: "100%",
              // height: 100,
              width: layout.width * 0.7,
              borderRadius: 10,
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: layout.widthp,
          paddingLeft: 10,
          flex: 1,
          paddingBottom: 5,
        }}
      >
        <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
          Transaction ID - {data.transaction_id}
        </Text>
        <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
          Unique ID - {data.unique_id}
        </Text>
        <Text style={{ fontFamily: "poppins-medium", fontSize: 18 }}>
          Amount - {data.amount}
        </Text>
      </View>
    </View>
  );
};

export default TopContainer;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    height: 600,
    width: layout.widthp,
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 10,
    // marginHorizontal:10
    marginBottom: 20,
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 20,
  },
});
