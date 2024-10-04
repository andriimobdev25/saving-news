import {
  Text,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import SliderItem from "./sliderItem";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
const slider = ({ data }) => {
  const { width } = useWindowDimensions();
  const xvalue = useSharedValue(0);
  const scrollRef = useAnimatedRef();
  const scrollHandler = useAnimatedScrollHandler((e) => {
    xvalue.value = e.contentOffset.x;
  });
  const nextPressHandler = () => {
    const nextOffset = xvalue.value + width;
    if (nextOffset / width > 2) {
      return;
    }
    scrollRef.current.scrollToOffset({
      offset: nextOffset,
      animated: true,
    });
  };
  const arrowStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(xvalue.value < 768 ? 1 : 0),
    };
  });
  const getStartedStyle = useAnimatedStyle(() => {
    return {
      opacity: withSpring(xvalue.value >= 768 ? 1 : 0),
    };
  });
  return (
    <View style={styles.outerContainer}>
      <Animated.FlatList
        ref={scrollRef}
        horizontal
        data={data}
        keyExtractor={(_, index) => `item-${index}`}
        renderItem={(itemDetails, index) => {
          return <SliderItem itemDetails={itemDetails}></SliderItem>;
        }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      ></Animated.FlatList>
      <Animated.View style={arrowStyle}>
        <AntDesign
          onPress={nextPressHandler}
          name="arrowright"
          size={32}
          color="black"
          style={styles.nextIcon}
        />
      </Animated.View>
      <Animated.View style={getStartedStyle}>
        <Pressable
          onPress={() => {
            router.replace("(tabs)");
          }}
          android_ripple={{ color: "#fff" }}
          style={styles.buttonContainer}
        >
          <Text style={styles.getStarted}>Get Started</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default slider;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "red",
  },
  nextIcon: {
    position: "absolute",
    bottom: 150,
    left: "50%",
    transform: [{ translateX: -20 }],
    color: "red",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    fontWeight: "bold",
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "white",
    position: "absolute",
    bottom: 100,
    left: "50%",
    transform: [{ translateX: -75 }],
  },
  getStarted: {
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    fontSize: 20,
  },
});
