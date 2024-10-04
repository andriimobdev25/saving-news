import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <>
      <StatusBar style="light"></StatusBar>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index"></Stack.Screen>
        <Stack.Screen name="(tabs)"></Stack.Screen>
      </Stack>
    </>
  );
};

export default RootLayout;
