import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Button = ({ children, onPress }) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text>{children}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({});
