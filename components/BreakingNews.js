import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
import React from "react";
import BreakingNewsitem from "./BreakingNewsitem";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Colors from "../constants/Colors";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
const { width } = Dimensions.get("screen");
const BreakingNews = ({ breakingNews }) => {
  const x = useSharedValue(0);
  const scrollRef = useAnimatedRef();
  const scrollHandler = useAnimatedScrollHandler((e) => {
    x.value = e.contentOffset.x;
  });
  const nextPressHandler = () => {
    const len = breakingNews.length;
    const nextOffset = x.value + width;
    if (nextOffset / width > len) {
      return;
    }
    scrollRef.current.scrollToOffset({
      offset: nextOffset,
      animated: true,
    });
  };
  const prevPressHandler = () => {
    const nextOffset = x.value - width;
    if (nextOffset / width < 0) {
      return;
    }
    scrollRef.current.scrollToOffset({
      offset: nextOffset,
      animated: true,
    });
  };

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.heading}>BreakingNews</Text>
      <View style={[{ width }]}>
        <Animated.FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={breakingNews}
          keyExtractor={(item) => item.article_id}
          renderItem={({ item }) => {
            return <BreakingNewsitem item={item}></BreakingNewsitem>;
          }}
          scrollEventThrottle={16}
          ref={scrollRef}
          onScroll={scrollHandler}
        ></Animated.FlatList>
        <View
          style={{
            height: 50,
            width: width,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Pressable onPress={prevPressHandler}>
            <MaterialIcons
              name="navigate-before"
              size={24}
              color="black"
              style={styles.navigationBtn}
            />
          </Pressable>
          <Pressable onPress={nextPressHandler}>
            <MaterialIcons
              name="navigate-next"
              size={24}
              color="black"
              style={styles.navigationBtn}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  outerContainer: {},
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
  navigationBtn: {
    backgroundColor: Colors.PRIMARY_COLOR,
    color: "white",
    borderRadius: 20,
    fontSize: 30,
  },
});
