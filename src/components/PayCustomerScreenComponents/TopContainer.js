import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { layout } from "../../constants/layout";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TopContainer = () => {
  const [loading, setLoading] = useState(false);
  async function getData() {
    setLoading(true);
    let result = await SecureStore.getItemAsync("id");
    axios
      .post(
        "http://codelumina.com/project/wallet_managment/api/agent/receipt/lists",
        {
          agent_id: result,
        }
      )
      .then(async (res) => {
        console.log(res.data.data);
        // setTransactions(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          Alert.alert(
            "Failed to get transaction data, try again later",
            JSON.stringify(error.response.data.message)
          );
          setLoading(false);
        } else if (error.request) {
          console.log(error.request);
          setLoading(false);
        } else {
          console.log("Error", error.message);
          setLoading(false);
        }
        console.log(error.config);
        setLoading(false);
      });
  }
  return (
    <View style={styles.root}>
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          width: layout.widthp,
          paddingHorizontal: 10,
        }}
      >
        <Text style={styles.title}>Transaction ID - </Text>
        <Text style={styles.title}>Unique ID - </Text>
        <Text style={styles.title}>Date - </Text>
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
    // width: layout.widthp,
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 10,
    // marginHorizontal:10
  },
  title: {
    fontFamily: "poppins-semibold",
    fontSize: 20,
  },
});
