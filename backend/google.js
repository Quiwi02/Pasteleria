import { initializeApp } from "firebase/app";
import { GoogleAuthProvider,getAuth, signInWithRedirect, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDCZuGNdQ15F4GpG9VOxrwqj1UQSeHdtHQ",
  authDomain: "auth-f282f.firebaseapp.com",
  projectId: "auth-f282f",
  storageBucket: "auth-f282f.firebasestorage.app",
  messagingSenderId: "1011103121218",
  appId: "1:1011103121218:web:df3d0adf467820a79112db",
  measurementId: "G-DG54BSVJBG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { signInWithRedirect, auth,provider,signOut };