// Insert to front
// App.js

// функції розраховані на функціональний підхід, щоб пофіксати треба ті сетери які є просто поміняти на сетери в стейт

import firebase, { firestore } from "firebase/app";

import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCBcles3gmPkSje4l5CoErNaSL4dUXYtO8",
  authDomain: "card-picker-5fe6d.firebaseapp.com",
  projectId: "card-picker-5fe6d",
  storageBucket: "card-picker-5fe6d.appspot.com",
  messagingSenderId: "206451807131",
  appId: "1:206451807131:web:a823fcb78fe2a93dc5073e",
  measurementId: "G-28NQHD56SZ"
};

if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const [cards, setCards] = useState({});
const [userProfile, setUserProfile] = useState({});

const cardsRef = firebase.firestore().collection("cards");
const usersProfileRef = firebase.firestore().collection("usersProfile");

cardsRef.onSnapshot(querySnapshot => {
  const cardsItems = [];
  querySnapshot.forEach(cardsItem => {
    console.log(cardsItem.id);
    cardsItems.push(cardsItem.data());
  });
  setCards(cardsItems);
});

// Get all

usersProfileRef.onSnapshot(querySnapshot => {
  const usersItems = [];
  querySnapshot.forEach(usersItem => {
    console.log(usersItem.id);
    usersItems.push(usersItem.data());
  });
  setUserProfile(usersItems);
});

usersProfileRef.where("field", "==", "value").onSnapshot(querySnapshot => {
  const usersItems = [];
  querySnapshot.forEach(usersItem => {
    console.log(usersItem.id);
    usersItems.push(usersItem.data());
  });
  setUserProfile(usersItems);
});

// Get by document id

cardsRef.doc("id").onSnapshot(querySnapshot => {
  const card = querySnapshot.data();
});
