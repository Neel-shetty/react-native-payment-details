import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";

const data = {
  data: {
    agent_current_lat: "37.4220936",
    agent_current_lng: "-122.083922",
    agent_id: "12",
    agent_ip: "49.205.136.16",
    amount: "12000",
    commission: "4000",
    created_at: "2023-01-28T05:48:49.000000Z",
    id: 7,
    receive_money_location: "Demo",
    receiver_address: "xyz",
    receiver_id_card_image: "uploads/transactions/5715495276.png",
    receiver_image: "uploads/transactions/411366486.jpeg",
    receiver_name: "agent 2",
    receiver_phone: "0987654321",
    sender_address: "abc",
    sender_id_card_image: "uploads/transactions/8713358315.jpeg",
    sender_image: "uploads/transactions/9079505369.jpeg",
    sender_name: "agent 1",
    sender_phone: "1234567890",
    status: "Pending",
    transaction_id: "uall4obabf80372",
    unique_id: "qcp8f461039",
    updated_at: "2023-01-28T05:48:49.000000Z",
  },
};

const TransactionItem = ({ id, date, amount }) => {
  console.log("🚀 ~ file: TransactionItem.js:8 ~ TransactionItem ~ id", id);
  const navigation = useNavigation();
  function transactionDetails() {
    navigation.navigate("TransactionInfoScreen", { transaction_id: id });
  }
  const formattedDate = new Date(date);
  // console.log(formattedDate.toLocaleDateString("en-GB"));
  return (
    <TouchableOpacity onPress={transactionDetails}>
      <View style={styles.root}>
        <View style={{ flex: 3 }}>
          <Text style={styles.title}>Transaction id - {id}</Text>
          <Text style={styles.date}>
            Date - {formattedDate.toLocaleDateString("en-GB")}
            {"\n"}
            Time - {date.slice(11, 19)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.amount}>₹{amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  root: {
    height: 100,
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
    textAlign: "right",
  },
});
