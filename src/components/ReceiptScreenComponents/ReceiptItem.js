import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";

const ReceiptItem = ({ id, date, amount, receiptId }) => {
  console.log("🚀 ~ file: TransactionItem.js:8 ~ TransactionItem ~ id", id);
  const navigation = useNavigation();
  function transactionDetails() {
    navigation.navigate("ReceiptInfoScreen", { receipt_id: receiptId });
  }
  const formattedDate = new Date(date);
  return (
    <TouchableOpacity onPress={transactionDetails}>
      <View style={styles.root}>
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>Transaction id - {id}</Text>
          <Text style={styles.date}>
            Date - {formattedDate.toLocaleDateString("en-GB")}
            {"\n"}
            {/* Time - {date.slice(11, 19)} */}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.amount}>₹{amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReceiptItem;

const styles = StyleSheet.create({
  root: {
    height: 90,
    width: layout.widthp,
    elevation:6,
shadowRadius: 5,
shadowOpacity: 0.25,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 5,
    // borderWidth: 1,
    // borderColor: colors.green,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 14,
  },
  date: {
    fontFamily: "poppins-regular",
  },
  amount: {
    fontFamily: "poppins-medium",
    fontSize: 17,
    textAlign: "right",
  },
});
