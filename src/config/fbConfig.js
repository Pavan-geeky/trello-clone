import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyAj8tY-2U4QQ9586LCNBmLg6S1eLK2j9LQ",
  authDomain: "todo-b1f23.firebaseapp.com",
  databaseURL: "https://todo-b1f23.firebaseio.com",
  projectId: "todo-b1f23",
  storageBucket: "todo-b1f23.appspot.com",
  messagingSenderId: "707402156576",
  appId: "1:707402156576:web:e8839961bab48931c20a45"
};

firebase.initializeApp(firebaseConfig);

export default firebase;