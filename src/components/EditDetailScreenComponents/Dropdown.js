import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { layout } from "../../constants/layout";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { setSelectedDropdown } from "../../store/slice/userSlice";

const countries = ["Canada", "Australia", "Ireland"];

const Dropdown = ({ data = [], title, defaultOption }) => {
  const dispatch = useDispatch();
  // console.log("🚀 ~ file: Dropdown.js:11 ~ Dropdown ~ data", data);
  let options = [];
  for (let i = 0; i < data.length; i++) {
    options.push(data[i].name);
  }
  // console.log(options);
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <Text style={styles.infoText}>{title}</Text>
      </View>
      <View style={styles.inputRow}>
        <SelectDropdown
          data={options}
          defaultValue={defaultOption}
          defaultButtonText="Select an option"
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
            dispatch(setSelectedDropdown(selectedItem));
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return <Text style={{ color: "black" }}>{selectedItem}</Text>;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonTextStyle={{
            fontFamily: "poppins-medium",
            fontSize: 16,
            color: "#a1a1a1",
          }}
          buttonStyle={{
            width: layout.width * 0.86,
            borderRadius: 10,
            // elevation: 6,
            backgroundColor: "white",
            height: 30,
          }}
          renderDropdownIcon={() => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <AntDesign name="down" size={20} color="black" />
            </View>
          )}
          dropdownStyle={{ backgroundColor: "white", borderRadius: 10 }}
          rowStyle={{}}
          rowTextStyle={{ fontFamily: "poppins-medium" }}
          selectedRowStyle={{ backgroundColor: colors.green }}
          selectedRowTextStyle={{ color: "white" }}
        />

        {/* <Ionicons name="ios-checkmark-circle" size={22} color={colors.green} /> */}
      </View>
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  root: {
    width: layout.widthp,
    alignItems: "flex-start",
    justifyContent: "center",
    height: 68,
  },
  input: {
    width: layout.width * 0.8,
    fontFamily: "inter-semibold",
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
    borderBottomColor: colors.green,
    borderBottomWidth: 2.5,
    paddingBottom: 5,
    // width:layout.widthp
  },
  infoText: {
    fontFamily: "inter-semibold",
    fontSize: 12,
    color: colors.gray,
  },
  headerContainer: {
    paddingBottom: 8,
  },
});
