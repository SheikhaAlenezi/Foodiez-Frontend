import CategoryItem from "@/components/CategoryItem";
import { StyleSheet, View } from "react-native";
export default function Index() {
  return (
    <View style={styles.container}>
      <CategoryItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
