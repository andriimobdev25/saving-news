import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";
import { router } from "expo-router";
const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <View style={styles.outerContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="black" />
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          selectionColor={"gray"}
          selectionHandleColor={Colors.PRIMARY_COLOR}
          autoCapitalize="none"
          onChangeText={(value) => {
            setSearchInput(value);
          }}
          value={searchInput}
          onSubmitEditing={(e) => {
            router.push({
              pathname: `news/search`,
              params: { q: searchInput },
            });
            // console.log(e.nativeEvent);
          }}
        ></TextInput>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    backgroundColor: Colors.SECONDARY_COLOR,
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    gap: 10,
  },
  searchInput: {
    flex: 1,
  },
});
