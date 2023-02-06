import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { layout } from "../../constants/layout";
import { colors } from "../../constants/colors";
import MenuItem from "./MenuItem";
import { useNavigation } from "@react-navigation/native";
import Storage from "../../utils/expireStorage";

const Menu = () => {

  const navigation = useNavigation();
  function register() {
    navigation.navigate("DetailScreen");
  }
  function reports() {
    navigation.navigate("TransactionScreen");
  }
  function pay() {
    navigation.navigate("SearchTransactionScreen");
  }
  function receipt() {
    navigation.navigate("ReceiptScreen");
  }

  return (
    <View style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Options</Text>
      </View>
      <View style={styles.menuItemContainer}>
        <View style={styles.menu1}>
          <MenuItem
            title={"Register Transaction"}
            onPress={register}
            source={require("../../../assets/images/transaction.png")}
          />
          <MenuItem
            title={"Pay \nCustomer"}
            source={require("../../../assets/images/payment-method.png")}
            onPress={pay}
          />
        </View>
        <View style={styles.menu2}>
          <MenuItem
            title={"Reports"}
            onPress={reports}
            source={require("../../../assets/images/report.png")}
          />
          <MenuItem
            title={"Receipts"}
            onPress={receipt}
            source={require("../../../assets/images/g8.png")}
          />
        </View>
      </View>

      {/* <View style={{ flex: 2 }} /> */}
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: layout.width,
    height: 500,
    backgroundColor: "white",
    borderRadius: 20,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    elevation:6,
shadowRadius: 5,
shadowOpacity: 0.25,
    borderWidth: 1,
    // borderRightWidth: 2,
    // borderLeftWidth: 2,
    // borderTopWidth: 2,
    borderColor: '#edf0f3',
  },
  title: {
    fontFamily: "poppins-semibold",
    fontSize: 20,
  },
  titleContainer: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    width: layout.widthp,
    paddingLeft: 20,
    paddingTop: 10,
  },
  menuItemContainer: {
    flex: 6,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "pink",
    width: layout.widthp,
  },
  menu1: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menu2: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
