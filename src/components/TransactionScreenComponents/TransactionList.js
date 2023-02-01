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
import Storage from '../../utils/expireStorage'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const TransactionList = () => {
  const [transactions, setTransactions] = useState(null);
  console.log("🚀 ~ file: TransactionList.js:19 ~ TransactionList ~ transactions", transactions)
  const [loading, setLoading] = useState(false);
  const [refresh, setReferesh] = useState(false);
  async function fetchTransactionData() {
    setLoading(true);
    setReferesh(true);
    // let result = await SecureStore.getItemAsync("id");
    let result = await Storage.getItem("id");
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
        setReferesh(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          Alert.alert(
            "Failed to get transaction data, try again later",
            JSON.stringify(error.response.data.message)
          );
          setLoading(false);
          setReferesh(false);
        } else if (error.request) {
          console.log(error.request);
          setLoading(false);
          setReferesh(false);
        } else {
          console.log("Error", error.message);
          setLoading(false);
          setReferesh(false);
        }
        console.log(error.config);
        setLoading(false);
        setReferesh(false);
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
        onRefresh={fetchTransactionData}
        refreshing={refresh}
        data={transactions}
        renderItem={({ item }) => {
          return (
            // <View>
            <TransactionItem
              id={item.transaction_id}
              amount={item.amount}
              date={item.updated_at}
              deleteTransaction={""}
              currency={item.currency}
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
