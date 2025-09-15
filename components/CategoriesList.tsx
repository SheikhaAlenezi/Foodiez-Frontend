import { getAllCategories } from "@/api/category";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CategoryItem from "./CategoryItem";

interface Category {
  _id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data);
      } catch (err) {
        console.log("error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((cat) => (
        <CategoryItem
          key={cat._id}
          name={cat.name}
          color={cat.color}
          icon={cat.icon}
          onPress={() => console.log("selected", cat.name)}
        />
      ))}
    </ScrollView>
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 15,
  },
});
