import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import FormInput from "../common/FormInput";
import FormButton from "../common/FormButton";
import firebase from "firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  signIn = () => {
    if (email.length == 0 || password.length == 0) {
      setError("Please fill in all the fields");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setEmail("");
          setPassword("");
          setError("");
          navigation.navigate("Welcome");
        })
        .catch(err => {
          setError(err.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>What's up?</Text>

      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="mail"
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton buttonTitle="Sign In" onPress={() => signIn()} />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Sign Up")}
      >
        <Text style={styles.navButtonText}>
          Don't have an acount? Create one
        </Text>
      </TouchableOpacity>

      {error.length != 0 && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;

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
