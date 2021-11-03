import firebase from "firebase"
import "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBStzlzH6NqROa7hnQHrfioE7xUrndDanI",
  authDomain: "bhookhlaga.firebaseapp.com",
  projectId: "bhookhlaga",
  storageBucket: "bhookhlaga.appspot.com",
  messagingSenderId: "811723306090",
  appId: "1:811723306090:web:d4ebbc860f1f35165d8613",
  };

  const app= !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  const db = app.firestore();
  const storage = firebase.storage();

  export {db,storage};