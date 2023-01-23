import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TransactionItem from "./TransactionItem";
import { layout } from "../../constants/layout";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const TransactionList = () => {
  return (
    <View style={styles.root}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            // <View>
            <TransactionItem data={item} />
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
