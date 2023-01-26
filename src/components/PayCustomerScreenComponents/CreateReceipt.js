import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Input from "./Input";
import { layout } from "../../constants/layout";
import { Formik } from "formik";
import UploadButton from "./UploadButton";
import CustomButton from "../CustomButton";

const CreateReceipt = () => {
  return (
    <View style={styles.root}>
      <View
        style={{
          flex: 1,
          width: layout.widthp,
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "poppins-semibold",
            fontSize: 24,
            // color: colors.green,
          }}
        >
          Create Receipt
        </Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 5 }}>
        <Formik
          initialValues={{
            agent_id: "",
            transaction_id: "",
            amount: "",
            receiver_name: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors = false,
          }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Input
                title={"Agent ID"}
                placeholder={"Agent ID"}
                onChangeText={handleChange("agent_id")}
                onBlur={handleBlur("agent_id")}
                value={values.agent_id}
              />
              <Input
                title={"Transaction ID"}
                placeholder={"Transaction ID"}
                onChangeText={handleChange("transaction_id")}
                onBlur={handleBlur("transaction_id")}
                value={values.transaction_id}
              />
              <Input
                title={"Amount"}
                placeholder={"Amount"}
                onChangeText={handleChange("amount")}
                onBlur={handleBlur("amount")}
                value={values.amount}
              />
              <Input
                title={"Receiver Name"}
                placeholder={"Receiver Name"}
                onChangeText={handleChange("receiver_name")}
                onBlur={handleBlur("receiver_name")}
                value={values.receiver_name}
              />
              <UploadButton type={"senderImage"} />
              <View style={{ paddingVertical: 10 }}>
                <CustomButton title={"create Receipt"} onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default CreateReceipt;

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    // height: 400,
    width: layout.width,
    elevation: 6,
    backgroundColor: "white",
    borderRadius: 20,
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: "poppins-medium",
    fontSize: 20,
  },
});
