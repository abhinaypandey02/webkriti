import firebase from "firebase";
let firebaseConfig = {
    apiKey: "AIzaSyDWULoxifVEfQhdvVYbLL6RjVaeFifu-kQ",
    authDomain: "webkriti-49c44.firebaseapp.com",
    projectId: "webkriti-49c44",
    storageBucket: "webkriti-49c44.appspot.com",
    messagingSenderId: "205915661559",
    appId: "1:205915661559:web:c80d1a58b96036aad2dff2",
    measurementId: "G-D61WEC8FGW"
};
const fire=firebase.initializeApp(firebaseConfig);
export const extra=firebase.initializeApp(firebaseConfig,"extra");
export default fire;
