import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { layout } from "../../constants/layout";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../constants/colors";

const TopContainer = () => {
  const [loading, setLoading] = useState(false);
  // const [notSearched, setNotSearched] = useState(true);
  const searched = useSelector((state) => state.user.searched);
  console.log(
    "🚀 ~ file: TopContainer.js:13 ~ TopContainer ~ searched",
    searched
  );
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

  if (!searched) {
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>
        Search the transaction id to view it's details
      </Text>
    </View>;
  }
  if (searched)
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
          <Text style={styles.title}>
            Transaction ID - <Text style={{ color: colors.green }}>2</Text>
          </Text>
          <Text style={styles.title}>
            Unique ID - <Text style={{ color: colors.green }}>ttstbn</Text>
          </Text>
          <Text style={styles.title}>
            Date - <Text style={{ color: colors.green }}>2023-01-25</Text>
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
