import { createCategory } from "@/api/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

// here

const CategoryScreen = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  // me
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      Toast.show({
        type: "success",
        text1: "category added",
        text2: "your category was created successfully !",
        position: "top",
      });
    },
    onError: (err: any) => {
      const serverMessage = err.response?.data?.message;
      Toast.show({
        type: "error",
        text1: " Error",
        text2: serverMessage || "category already exists !",
        position: "top",
      });
    },
  });
  const colors = [
    "#FF6B6B",
    "#FFA500",
    "#FFD93D",
    "#6BCB77",
    "#4D96FF",
    "#9D4EDD",
    "#FF69B4",
    "#6A5ACD",
    "#20C997",
    "#17A2B8",
    "#808080",
  ];
  const icons = [
    "🍔",
    "☕",
    "🎂",
    "🍕",
    "🐟",
    "🍎",
    "🥬",
    "🍦",
    "🍗",
    "🥕",
    "🧃",
    "🍝",
    "🍣",
  ];
  return (
    <View style={styles.background}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Toast />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>Create Category</Text>

            <View style={styles.container}>
              <ScrollView
                style={{
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  marginBottom: 100,
                }}
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.username}>
                  Organize your recipes better!
                </Text>
                <View style={styles.formBox}>
                  <Text style={styles.label}>Category name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter category name"
                    placeholderTextColor={"white"}
                    value={categoryName}
                    onChangeText={setCategoryName}
                  />
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    style={styles.inputBig}
                    placeholder="Brief description of this category"
                    placeholderTextColor={"white"}
                    value={description}
                    onChangeText={setDescription}
                  />

                  <View style={styles.smallView}>
                    <Text style={styles.label}>Category color</Text>

                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{ marginTop: 10 }}
                    >
                      {colors.map((color) => (
                        <TouchableOpacity
                          key={color}
                          style={[
                            styles.colorBox,
                            { backgroundColor: color },
                            selectedColor === color && styles.selectedBox,
                          ]}
                          onPress={() => setSelectedColor(color)}
                        />
                      ))}
                    </ScrollView>
                  </View>
                  <View style={styles.smallView}>
                    <Text style={styles.label}>Category icon</Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{ marginTop: 10 }}
                    >
                      {icons.map((icon) => (
                        <TouchableOpacity
                          key={icon}
                          style={[
                            styles.iconBox,
                            selectedIcon === icon && styles.selectedBox,
                          ]}
                          onPress={() => setSelectedIcon(icon)}
                        >
                          <Text style={{ fontSize: 22 }}>{icon}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                  {/* shae >>  create button and cancel  */}
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.button, styles.cancelButton]}
                      onPress={() => {
                        setSelectedColor("");
                        setSelectedIcon("");
                        setShowPreview(false);
                        router.replace("/(tabs)/recipe");
                      }}
                    >
                      <Text style={styles.buttonText}> Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, styles.createButton]}
                      onPress={() => {
                        setShowPreview(true);
                        console.log("Create Category:", {
                          selectedColor,
                          selectedIcon,
                        });
                      }}
                    >
                      <Text style={[styles.buttonText, { color: "#fff" }]}>
                        Create Category
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* pop up message */}

                  <Modal
                    visible={showPreview}
                    transparent
                    animationType="slide"
                  >
                    <View style={styles.modalOverlay}>
                      <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Category Preview</Text>
                        <View
                          style={[
                            styles.previewBox,
                            { backgroundColor: selectedColor || "#ccc" },
                          ]}
                        >
                          <Text style={styles.previewIcon}>
                            {" "}
                            {selectedIcon || ""}
                          </Text>
                          <Text style={styles.previewName}>
                            {categoryName || "Category Name"}
                          </Text>
                          <Text style={styles.previewText}>
                            {description || "Description"}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={[styles.modalButton, styles.createButton]}
                          onPress={() => {
                            mutation.mutate({
                              name: categoryName,
                              description,
                              color: selectedColor,
                              icon: selectedIcon,
                            });
                            setShowPreview(false);
                            setCategoryName("");
                            setDescription("");
                            setSelectedColor("");
                            setSelectedIcon("");
                          }}
                        >
                          <Text style={styles.buttonModal}>Confirm & Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.modalButton, styles.cancelButton]}
                          onPress={() => setShowPreview(false)}
                        >
                          <Text style={styles.buttonModal2}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                  {/*  */}
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  formBox: {
    margin: 17,
    padding: 10,
    gap: 7,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fbd8eeff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  inputBig: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fbd8eeff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  smallView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  inputSmall: {
    width: "90%",
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fbd8eeff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  background: {
    height: "100%",
    backgroundColor: "#FFB0E0",
    paddingTop: 100, //for white card to low it a bit.
    // justifyContent: "flex-end", //heree
    // flex: 1,
  },
  icon: {
    textAlignVertical: "center", // vertical centering (Android)
    justifyContent: "center", // vertical centering (iOS/flex)
    alignItems: "center", // horizontal centering (flex)
    display: "flex",
    backgroundColor: "#E95322",
    height: 60,
    width: 60,
    borderRadius: 10,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  username: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    marginTop: 50,
    textAlign: "center",
  },
  cardName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    height: 650, // herreeee
    // flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 80,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.9)",
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    margin: 5,
  },
  selectedBox: {
    borderWidth: 2,
    borderColor: "purple",
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  createButton: {
    backgroundColor: "purple",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "purple",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "purple",
  },
  previewBox: {
    width: "100%",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  previewIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  previewName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  previewText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  buttonModal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonModal2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "purple",
  },
  modalButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
});
