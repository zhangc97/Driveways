import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCUKO-ASRV0r5w8Mbo4Dqh6x2vv8ls_OoE",
    authDomain: "driveways-3f7b7.firebaseapp.com",
    databaseURL: "https://driveways-3f7b7.firebaseio.com",
    projectId: "driveways-3f7b7",
    storageBucket: "driveways-3f7b7.appspot.com",
    messagingSenderId: "782125305096"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();
  const db = firebase.database();

  export {
    auth,
    db
  };
