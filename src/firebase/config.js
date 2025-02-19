import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBmC8bGNRJbO2JcPzwQXV8djfzilcuJ5Ms",
  authDomain: "olx-clone-5154e.firebaseapp.com",
  projectId: "olx-clone-5154e",
  storageBucket: "olx-clone-5154e.appspot.com",
  messagingSenderId: "371261850380",
  appId: "1:371261850380:web:091b6525ae3b5d4f513f29",
  measurementId: "G-L5YLWPL5F0"
};

export default firebase.initializeApp(firebaseConfig)

