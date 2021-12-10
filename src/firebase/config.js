import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB1hOaa8h3VqEsIRtw-wtFfni-UdaL6sFM",
    authDomain: "react-app-projectc.firebaseapp.com",
    projectId: "react-app-projectc",
    storageBucket: "react-app-projectc.appspot.com",
    messagingSenderId: "782319104115",
    appId: "1:782319104115:web:4db96373d15da334157a06"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }