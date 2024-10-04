import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.profileContainer}>
        <Image
          source={require("../assets/profile.jpg")}
          style={styles.profileImg}
        ></Image>
        <View style={styles.profileName}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Welcome</Text>
        </View>
      </Pressable>
      <Pressable>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
  },
  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileName: {
    justifyContent: "center",
    marginLeft: 10,
  },
});
