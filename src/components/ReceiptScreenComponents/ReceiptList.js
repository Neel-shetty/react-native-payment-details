import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import ReceiptItem from "./ReceiptItem";
import { layout } from "../../constants/layout";

const ReceiptList = () => {
  const [receipt, setReceipt] = useState(null);
  console.log("🚀 ~ file: ReceiptList.js:12 ~ ReceiptList ~ receipt", receipt);
  const [loading, setLoading] = useState(false);
  async function fetchReceiptData() {
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
        setReceipt(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          Alert.alert(
            "Failed to get Receipt data, try again later",
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
  useEffect(() => {
    fetchReceiptData();
  }, []);

  if (loading || !receipt) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={receipt}
        renderItem={({ item }) => {
          return (
            // <View>
            <ReceiptItem
              id={item.transaction_id}
              amount={item.amount}
              date={item.updated_at}
              receiptId={item.id}
            />
            // </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ReceiptList;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: layout.width,
  },
});
