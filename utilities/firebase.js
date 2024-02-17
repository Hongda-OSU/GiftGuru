import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrFP78IO10kj5eKbOIkWoiPrTSKGEGlus",
  authDomain: "giftguru-f7599.firebaseapp.com",
  databaseURL: "https://giftguru-f7599-default-rtdb.firebaseio.com/",
  projectId: "giftguru-f7599",
  storageBucket: "giftguru-f7599.appspot.com",
  messagingSenderId: "864266948979",
  appId: "1:864266948979:web:47130ee2300bb7651c3506",
};

export const getFirebaseApp = () => {
  return !getApps().length ? initializeApp(firebaseConfig) : getApp();
};

export const getFirebaseDatabase = (firebase) => {
  return getDatabase(firebase);
};

export const getFirebaseStorage = (firebase) => {
  return getStorage(firebase);
};
