import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchBar from "../../components/SearchBar";
import CountryList from "../../constants/CountryList";
import CategoryList from "../../constants/CategoriesList";
import Colors from "../../constants/Colors";
import { router } from "expo-router";
const DiscoverPage = () => {
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const safeArea = useSafeAreaInsets();
  return (
    <View style={[styles.outerContainer, { paddingTop: safeArea.top }]}>
      <SearchBar></SearchBar>
      <Text style={styles.heading}>Categories</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          marginHorizontal: 10,
        }}
      >
        {CategoryList.map((item) => {
          return (
            <Pressable
              key={item.id}
              style={styles.category}
              onPress={() => {
                setCategory(item.slug);
              }}
            >
              <Text
                style={[
                  styles.categoryTitle,
                  category == item.slug && {
                    backgroundColor: Colors.PRIMARY_COLOR,
                    color: "white",
                  },
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Text style={[styles.heading, { marginTop: 15 }]}>Countries</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 5,
          marginHorizontal: 10,
        }}
      >
        {CountryList.map((item) => {
          return (
            <Pressable
              key={item.code}
              style={styles.category}
              onPress={() => {
                setCountry(item.code);
              }}
            >
              <Text
                style={[
                  styles.categoryTitle,
                  country == item.code && {
                    backgroundColor: Colors.PRIMARY_COLOR,
                    color: "white",
                  },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable
        onPress={() => {
          router.push({
            pathname: "news/search",
            params: {
              category,
              country,
            },
          });
        }}
        android_ripple={{ color: "#fff" }}
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: Colors.PRIMARY_COLOR,
          marginTop: 20,
          marginHorizontal: 20,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 20 }}>
          Search
        </Text>
      </Pressable>
    </View>
  );
};

export default DiscoverPage;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    marginVertical: 15,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
  category: {
    marginHorizontal: 5,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    borderColor: Colors.PRIMARY_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: "center",
    color: Colors.PRIMARY_COLOR,
  },
});
