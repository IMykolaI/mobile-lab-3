import React, { useState, Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FormInput from "../common/FormInput";
import FormButton from "../common/FormButton";
import firebase from "firebase";

const CreateAdScreen = ({ navigation }) => {
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  createAd = () => {
    firebase
      .firestore()
      .collection("ads")
      .doc()
      .set({
        body: body,
        currency: "UAH",
        header: header,
        image_url: imageUrl,
        price: price,
        id: Date.now(),
        user_email: firebase.auth().currentUser.email
      })
      .then(() => {
        navigation.navigate("Welcome");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fill in the fields</Text>

      <FormInput
        labelValue={header}
        onChangeText={header => setHeader(header)}
        placeholderText="Name"
        iconType="tago"
      />

      <FormInput
        labelValue={body}
        onChangeText={body => setBody(body)}
        placeholderText="Description"
        iconType="profile"
      />

      <FormInput
        labelValue={price}
        onChangeText={price => setPrice(price)}
        placeholderText="Price (in UAH)"
        iconType="calculator"
      />

      <FormInput
        labelValue={imageUrl}
        onChangeText={imageUrl => setImageUrl(imageUrl)}
        placeholderText="Image Url"
        iconType="link"
      />

      <FormButton buttonTitle="Add Ad" onPress={() => createAd()} />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Welcome")}
      >
        <Text style={styles.navButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAdScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f"
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5"
  },
  error: {
    marginTop: 15
  },
  errorText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ff0000"
  }
});
