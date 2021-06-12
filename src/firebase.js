// firebase.js
import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBw6E2YjeNIaXHJMQSn1Btw25CwWYhSS78",
  authDomain: "calflix-2ba8e.firebaseapp.com",
  projectId: "calflix-2ba8e",
  storageBucket: "calflix-2ba8e.appspot.com",
  messagingSenderId: "426482673370",
  appId: "1:426482673370:web:fe966a0c1b5f46c4baa7e3"
};

firebase.initializeApp(firebaseConfig);

export default firebase;