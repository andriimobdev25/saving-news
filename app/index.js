import { StyleSheet, View } from "react-native";
import React from "react";
import Slider from "../components/slider";
import { onboardingData } from "../constants/onboardingData";
const index = () => {
  return (
    <View style={styles.outerContainer}>
      <Slider data={onboardingData}></Slider>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
});
