import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import TopContainer from "../../components/PayCustomerScreenComponents/TopContainer";
import BottomContainer from "../../components/PayCustomerScreenComponents/BottomContainer";
import CreateReceipt from "../../components/PayCustomerScreenComponents/CreateReceipt";
import SearchResultHeader from "../../components/PayCustomerScreenComponents/SearchResultHeader";

const data = {
  agent_current_city: null,
  agent_current_lat: "22.759430",
  agent_current_lng: "75.886009",
  agent_current_location: null,
  agent_current_state: null,
  agent_id: "12",
  agent_ip: "457456",
  amount: "7000",
  commission: "500",
  created_at: "2023-01-27T11:44:14.000000Z",
  id: 4,
  receive_money_location: "Bhopal Test Res",
  receiver_address: "Bhopal",
  receiver_id_card_image: "uploads/transactions/9741982489.png",
  receiver_image: "uploads/transactions/4742953557.jpg",
  receiver_name: "David",
  receiver_phone: "7767878342",
  sender_address: "Indore",
  sender_id_card_image: "uploads/transactions/7550689960.jpg",
  sender_image: "uploads/transactions/7498912068.jpg",
  sender_name: "max",
  sender_phone: "8787876565",
  status: "Pending",
  transaction_id: "ixuajoygmg99131",
  unique_id: "xbm8j422608",
  updated_at: "2023-01-27T11:44:14.000000Z",
};

const SearchResultScreen = ({ route }) => {
  return (
    // <View style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        enabled={false}
        style={styles.root}
      >
      <View
        style={{
          flex: 0.5,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <SearchResultHeader />
      </View>
      {/* <View
          style={{
            flex: 2,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "pink",
          }}
        >
          <TopContainer />
        </View> */}
      <View
        style={{
          flex: 7,
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "v"
        }}
      >
        <CreateReceipt />
      </View>
      {/* ) : (
        <>
          <View
            style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
          >
            <TopContainer data={route.params.transactionData} />
          </View>
          <View
            style={{ flex: 5, alignItems: "center", justifyContent: "center" }}
          >
            <BottomContainer data={route.params.transactionData} />
          </View>
        </>
      )} */}
      </KeyboardAvoidingView>
    // </View>
  );
};

export default SearchResultScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#F6F7FD",
  },
});
