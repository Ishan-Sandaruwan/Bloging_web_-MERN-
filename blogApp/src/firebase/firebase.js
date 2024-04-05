import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAzPJin99W2Gs43o6MwCBEcnnJyVimOKRY",
  authDomain: "blogweb-3cf7b.firebaseapp.com",
  projectId: "blogweb-3cf7b",
  storageBucket: "blogweb-3cf7b.appspot.com",
  messagingSenderId: "668461885668",
  appId: "1:668461885668:web:96141c9b36a4b55232a4f1",
  measurementId: "G-RB47B6QWH6",
};

export const app = initializeApp(firebaseConfig);

// service firebase.storage {
//     match /b/{bucket}/o {
//       match /{allPaths=**} {
//         allow read;
//         allow write: if
//           request.resource.size < 5 * 1024 * 1024 &&
//           request.resource.contentType.matches('image/.*')
//         ;
//       }
//     }
//   }
