import firebase from 'firebase';

const config ={
  apiKey: "AIzaSyAqx5K-GLdiRpS7vk5DYYr8bIka2DNCH2o",
  authDomain: "technox-message.firebaseapp.com",
  projectId: "technox-message",
  storageBucket: "technox-message.appspot.com",
  messagingSenderId: "754631101991",
  appId: "1:754631101991:web:f729d5231222fcc8a48802"
}
firebase.initializeApp(config)

export default firebase