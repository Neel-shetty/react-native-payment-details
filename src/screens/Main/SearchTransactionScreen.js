import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import React from "react";
import React, { useEffect } from "react";
import TopContainer from "../../components/PayCustomerScreenComponents/TopContainer";
import SearchBar from "../../components/PayCustomerScreenComponents/SearchBar";
import BottomContainer from "../../components/PayCustomerScreenComponents/BottomContainer";
import { useSelector } from "react-redux";
import CreateReceipt from "../../components/PayCustomerScreenComponents/CreateReceipt";
import { StatusBar } from "expo-status-bar";
import { layout } from "../../constants/layout";
import Header from "../../components/PayCustomerScreenComponents/Header";
import Storage from "../../utils/expireStorage";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../store/slice/userSlice";

const SearchTransactionScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkLogin() {
      let result = await Storage.getItem("isLoggedIn");
      console.log("🚀 ~ file: checkLogin.js:21 ~ getValueFor ~ result", result);
      if (result !== "true") {
        dispatch(setLoggedIn(false));
      }
    }

    checkLogin();
  }, []);
  const receiptSearch = useSelector((state) => state.user.receiptSearch);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 70}
      enabled={false}
      style={styles.root}
    >
      {/* <View style={styles.root}> */}
      <StatusBar style="dark" />
      <SafeAreaView style={styles.root}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "pink",
          }}
        >
          <Header />
        </View>
        <View
          style={{
            flex: 7,
            alignItems: "center",
            // justifyContent: "center",
            paddingTop: 20,
            width: layout.width,
            // marginTop: 30,
          }}
        >
          <SearchBar />
        </View>
        {receiptSearch ? (
          <>
            {/* <View
              style={{
                flex: 2,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TopContainer />
            </View> */}
            {/* <View style={{ flex: 5 }}>
              <BottomContainer />
            </View> */}
          </>
        ) : // <View style={{ flex: 5 }}>
        //   <CreateReceipt />
        // </View>
        null}
      </SafeAreaView>
    </KeyboardAvoidingView>
    // {/* </View> */}
  );
};

export default SearchTransactionScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#F6F7FD",
  },
});
