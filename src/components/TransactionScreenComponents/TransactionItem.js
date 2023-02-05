import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";
import { Feather } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Storage from "../../utils/expireStorage";

const TransactionItem = ({ id, date, amount, currency, status }) => {
  const navigation = useNavigation();
  function transactionDetails() {
    navigation.navigate("TransactionInfoScreen", { transaction_id: id });
  }
  async function deleteTransaction() {
    // const result = await SecureStore.getItemAsync("id");
    axios
      .post(
        "http://codelumina.com/project/wallet_managment/api/agent/transaction/delete",
        {
          transaction_id: id,
        }
      )
      .then((res) => {
        console.log(res.data);
        Alert.alert(
          "Success",
          `${res.data.message}. Referesh page to view changes`
        );
      })
      .catch((error) => {
        // console.log(e.toJSON());
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          Alert.alert("Failed", JSON.stringify(error.response.data.message));
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }

  const formattedDate = new Date(date);
  return (
    <TouchableOpacity onPress={transactionDetails}>
      <View style={styles.root}>
        <View style={{ flex: 2 }}>
          <Text style={styles.title}>Transaction id - {id}</Text>
          <Text style={styles.date}>
            Status - {status}
            {"\n"}
            Date - {formattedDate.toLocaleDateString("en-GB")}
            {"\n"}
            Time - {date.slice(11, 19)}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              // backgroundColor: "pink",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text ellipsizeMode="tail" style={styles.amount}>
              {currency?.slice(0, 1)}
              {amount}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              paddingBottom: 10,
              paddingRight: 10,
            }}
          >
            {/* <TouchableOpacity>
              <Feather name="edit" size={20} color="black" />
            </TouchableOpacity> */}
            <Menu style={{ height: 25, width: 25 }}>
              <MenuTrigger
                children={<Feather name="edit" size={20} color="black" />}
              />
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    backgroundColor: "white",
                    borderRadius: 10,
                    elevation: 6,
                    padding: 5,
                    width: 100,
                  },
                }}
              >
                <MenuOption
                  onSelect={() =>
                    navigation.navigate("EditDetailScreen", {
                      transaction_id: id,
                    })
                  }
                >
                  <Text style={{ fontFamily: "poppins-medium" }}>Edit</Text>
                </MenuOption>
                <MenuOption onSelect={deleteTransaction}>
                  <Text style={{ color: "red", fontFamily: "poppins-medium" }}>
                    Delete
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransactionItem;

const styles = StyleSheet.create({
  root: {
    height: 120,
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
