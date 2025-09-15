import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CategoryItem from "./CategoryItem";
const CreateNewScreen = () => {
  return (
    <View style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text style={styles.title}>Create Recipe</Text>

            <View style={styles.container}>
              <ScrollView
                style={{
                  borderTopLeftRadius: 50,
                  borderTopRightRadius: 50,
                  marginBottom: 100,
                }}
              >
                <Text style={styles.username}>
                  Share your delecious creations!
                </Text>
                <View style={styles.formBox}>
                  <Text style={styles.label}>Recipe name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter recipe name"
                    placeholderTextColor={"white"}
                  />
                  <Text style={styles.label}>Recipe description</Text>
                  <TextInput
                    style={styles.inputBig}
                    placeholder="Enter recipe description"
                    placeholderTextColor={"white"}
                  />
                  <Text style={styles.label}>Recipe instructions</Text>
                  <TextInput
                    style={styles.inputBig}
                    placeholder="Enter recipe instructions"
                    placeholderTextColor={"white"}
                  />
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={styles.smallView}>
                      <Text style={styles.label}>Prep time</Text>
                      <TextInput
                        style={styles.inputSmall}
                        placeholder="30 minutes"
                        placeholderTextColor={"white"}
                      />
                    </View>
                    <View style={styles.smallView}>
                      <Text style={styles.label}>Serving</Text>
                      <TextInput
                        style={styles.inputSmall}
                        placeholder="4 people"
                        placeholderTextColor={"white"}
                      />
                    </View>
                  </View>
                  <Text style={styles.label}>Category</Text>
                  <CategoryItem />
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateNewScreen;

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
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
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
    justifyContent: "flex-end",
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
    height: 700,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.9)",
  },
});
