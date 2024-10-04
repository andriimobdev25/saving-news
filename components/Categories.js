import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoriesList from "../constants/CategoriesList";
import Colors from "../constants/Colors";
const Categories = ({ category, onCategoryChange }) => {
  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesWrapper}
      >
        {CategoriesList.map((item, index) => {
          return (
            <Pressable
              key={item.id}
              style={styles.category}
              onPress={() => {
                onCategoryChange(item.slug);
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
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categoriesWrapper: {
    gap: 5,
    paddingVertical: 5,
    marginHorizontal: 15,
  },
  category: {
    marginHorizontal: 5,
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
