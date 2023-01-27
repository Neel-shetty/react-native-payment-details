import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";

const TransactionItem = ({ id, date, amount }) => {
  console.log("🚀 ~ file: TransactionItem.js:8 ~ TransactionItem ~ id", id)
  const navigation = useNavigation();
  function transactionDetails() {
    navigation.navigate("TransactionInfoScreen", { transaction_id: id });
  }
  const formattedDate = new Date(date);
  // console.log(formattedDate.toLocaleDateString("en-GB"));
  return (
    <TouchableOpacity onPress={transactionDetails}>
      <View style={styles.root}>
        <View>
          <Text style={styles.title}>Transaction id - {id}</Text>
          <Text style={styles.date}>
            Date - {formattedDate.toLocaleDateString("en-GB")}
            {"\n"}
            Time - {date.slice(11, 19)}
          </Text>
        </View>
        <View>
          <Text style={styles.amount}>₹{amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  root: {
    height: 90,
    width: layout.widthp,
    elevation: 6,
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
    fontSize: 16,
  },
  date: {
    fontFamily: "poppins-regular",
  },
  amount: {
    fontFamily: "poppins-medium",
    fontSize: 20,
  },
});
