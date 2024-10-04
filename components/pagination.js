import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Pagination = () => {
  return (
    <View style={styles.outerContainer}>
      <Text>Pagination</Text>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    bottom: 50,
  },
});
