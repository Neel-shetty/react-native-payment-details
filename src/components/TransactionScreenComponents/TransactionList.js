import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import { layout } from "../../constants/layout";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const TransactionList = () => {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(false);
  async function fetchTransactionData() {
    setLoading(true);
    let result = await SecureStore.getItemAsync("id");
    axios
      .post(
        "http://codelumina.com/project/wallet_managment/api/agent/transactions",
        {
          agent_id: result,
        }
      )
      .then(async (res) => {
        console.log(res.data.data);
        setTransactions(res.data.data);
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

  useEffect(() => {
    fetchTransactionData();
  }, []);

  if (loading || !transactions) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.root}>
      <FlatList
        data={transactions}
        renderItem={({ item }) => {
          console.log(
            "🚀 ~ file: TransactionList.js:86 ~ TransactionList ~ item",
            item
          );
          return (
            // <View>
            <TransactionItem
              id={item.transaction_id}
              amount={item.amount}
              date={item.updated_at}
            />
            // </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: layout.width,
  },
});
