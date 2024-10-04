import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          width: "90%",
          height: 70,
          left: 20,
          right: 20,
          bottom: 10,
          borderRadius: 20,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: Colors.PRIMARY_COLOR,
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "index":
              iconName = focused ? "home-sharp" : "home-outline";
              break;
            case "discover":
              iconName = focused ? "compass-sharp" : "compass-outline";
              break;
            case "saved":
              iconName = focused ? "bookmarks" : "bookmarks-outline";
              break;
            default:
              break;
          }
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              style={{
                // backgroundColor: focused ? Colors.PRIMARY_COLOR : "",
                // color: focused ? "white" : Colors.PRIMARY_COLOR,
                borderRadius: 20,
                fontSize: 30,
              }}
            ></Ionicons>
          );
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="discover"
        options={{ title: "Discover" }}
      ></Tabs.Screen>
      <Tabs.Screen name="saved" options={{ title: "Saved" }}></Tabs.Screen>
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
