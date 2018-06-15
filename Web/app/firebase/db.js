import { db } from './firebase';

// USER API

export const doCreateUser = (id, username, email ) => (
  db.ref(`users/${id}`).set({
    username,
    email,
  })
)

export var doAddCoordinateToDatabase = (function(id, coordinates) {
  var newPostKey = db.ref().child('listings').push().key;
  var updates = {};
  updates['/listings/' + newPostKey] = coordinates;
  updates[`users/${id}/owner/${newPostKey}`] = newPostKey;
  //add key to users table
  return db.ref().update(updates);
})

export const onceGetCoords = () => (
  db.ref('listings').once('value')
)
