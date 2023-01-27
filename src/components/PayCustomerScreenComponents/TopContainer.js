import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { layout } from "../../constants/layout";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import { setReceiptData } from "../../store/slice/userSlice";

const TopContainer = ({ data }) => {
  console.log(
    "🚀 ~ file: TopContainer.js:11 ~ TopContainer ~ data",
    data.created_at
  );
  const [details, setDeatils] = useState();
  console.log(
    "🚀 ~ file: TopContainer.js:13 ~ TopContainer ~ details",
    details
  );
  const receiptId = useSelector((state) => state.user.receipt);
  console.log(
    "🚀 ~ file: TopContainer.js:16 ~ TopContainer ~ receiptId",
    receiptId
  );

  const date = new Date(data.created_at);
  console.log("🚀 ~ file: TopContainer.js:59 ~ TopContainer ~ date", date);

  return (
    <View style={styles.root}>
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          width: layout.widthp,
          paddingHorizontal: 10,
        }}
      >
        {/* {searched ? (
          <> */}
        <Text style={styles.title}>
          Transaction ID -{" "}
          <Text style={{ color: colors.green }}>{data.transaction_id}</Text>
        </Text>
        <Text style={styles.title}>
          Unique ID -{" "}
          <Text style={{ color: colors.green }}>{data.unique_id}</Text>
        </Text>
        <Text style={styles.title}>
          Date -{" "}
          <Text style={{ color: colors.green }}>
            {date ? date.toLocaleDateString("en-GB") : ""}
          </Text>
        </Text>
        {/* </>
        ) : (
          <Text style={styles.title}>
            Search using transaction ID to get it's details
          </Text>
        )} */}
      </View>
    </View>
  );
};

export default TopContainer;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    width: layout.widthp,
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 10,
    // marginHorizontal:10
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 20,
  },
});
