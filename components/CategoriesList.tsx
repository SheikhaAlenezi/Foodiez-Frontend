import { getAllCategories } from "@/api/category";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import CategoryItem from "./CategoryItem";

interface Category {
  _id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

const CategoriesList = ({
  onCategorySelect,
}: {
  onCategorySelect: (id: string) => void;
}) => {
  // const [categories, setCategories] = useState<Category[]>([]);
  // me
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
  if (isLoading) return <Text>Loading</Text>;
  if (isError) return <Text>Error fetching categories</Text>;
  const categories: Category[] = data?.data || [];

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const res = await getAllCategories();
  //       setCategories(res.data);
  //     } catch (err) {
  //       console.log("error fetching categories", err);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {/* updates here */}

      {categories.map((cat) => (
        <CategoryItem
          key={cat._id}
          name={cat.name}
          color={cat.color}
          icon={cat.icon}
          onPress={() => onCategorySelect(cat.name)}
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
