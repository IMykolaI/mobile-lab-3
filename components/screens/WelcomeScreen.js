import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import FormButton from "../common/FormButton";
import firebase from "firebase";
import { Card } from "../common";
import { windowHeight } from "../utils/Dimensions";

const ProfileScreen = ({ navigation }) => {
  const [ads, setAds] = useState([]);

  const ref = firebase.firestore().collection("ads");

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("Sign In");
      });
  };

  deleteFromFirebase = adId => {
    firebase
      .firestore()
      .collection("ads")
      .where("id", "==", adId)
      .get()
      .then(docs => {
        docs.forEach(doc => {
          firebase
            .firestore()
            .collection("ads")
            .doc(doc.id)
            .delete();
        });
      });
  };

  deleteAd = adId => {
    Alert.alert("Delete ad", "Are you sure?", [
      {
        text: "Yes",
        onPress: () => {
          deleteFromFirebase(adId);
        }
      },
      { text: "No", onPress: () => {} }
    ]);
  };

  getAds = () => {
    ref.onSnapshot(querySnapshot => {
      const items = [];
      querySnapshot.forEach(doc => {
        items.push(doc.data());
      });
      setAds(items);
    });
  };

  useEffect(() => {
    getAds();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Welcome {firebase.auth().currentUser.displayName}
      </Text>
      <View style={{ height: 10 }}></View>

      {ads.length == 0 && (
        <Text style={styles.text}>
          There are no ads available at this moment
        </Text>
      )}

      {ads.length > 0 && (
        <ScrollView>
          {ads.map(ad => {
            return (
              <Card key={ad.id} style={styles.text}>
                <Text style={styles.textContainer}>{ad.header}</Text>
                <Text style={styles.textContainer}>{ad.body}</Text>
                <Text style={styles.textContainer}>
                  {ad.price} {ad.currency}
                </Text>
                <Image
                  style={styles.image}
                  source={{
                    uri: ad.image_url
                  }}
                />
                {ad.user_email == firebase.auth().currentUser.email && (
                  <FormButton
                    buttonTitle="Delete Ad"
                    onPress={() => {
                      deleteAd(ad.id);
                    }}
                  ></FormButton>
                )}
              </Card>
            );
          })}
        </ScrollView>
      )}

      <FormButton
        buttonTitle="Add Ad"
        onPress={() => navigation.navigate("CreateAd")}
      />
      <FormButton buttonTitle="Logout" onPress={() => logout()} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9fafd",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  text: {
    fontSize: 20,
    color: "#333333"
  },
  textContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: "100%",
    height: windowHeight / 25,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    fontSize: 16
  },
  image: {
    margin: 10,
    width: "94%",
    height: 200,
    padding: 10,
    alignItems: "center"
  }
});
