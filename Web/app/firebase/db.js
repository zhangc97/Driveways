import { db } from './firebase';

// USER API

export const doCreateUser = (id, username, email ) => (
  db.ref(`users/${id}`).set({
    username,
    email,
  })
)

export const doAddCoordinateToDatabase = ( id, [coordinates] ) => (
  db.ref(`users/${id}/listings`).set({
    coordinates
  })
)

export const onceGetUsers = () => (
  db.ref('users').once('value')
)
