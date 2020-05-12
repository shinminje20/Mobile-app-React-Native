import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
// import firebase from 'react-native-firebase'
import firebase from '@react-native-firebase/app';

// function googleSignIn() {
//     const googleLogin = () => {
//       try {
//         // add any configuration settings here:
//         await GoogleSignin.configure();
    
//         const data = await GoogleSignin.signIn();
    
//         // create a new firebase credential with the token
//         const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
//         // login with credential
//         const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
    
//         console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
//       } catch (e) {
//         console.error(e);
//       }
//     }
// }

export default async function signInWithGoogle() {
  // Add any configuration settings here:
  await GoogleSignin.configure({
    webClientId: '1037981422391-s170biidlalc8ds20n85c2g48ebmo24u.apps.googleusercontent.com'
  })

  const data = await GoogleSignin.signIn()

  const res = await GoogleSignin.getTokens()

  // create a new firebase credential with the token
  const credential = GoogleAuthProvider.credential(data.idToken, res.accessToken)

  // login with credential
  return auth.signInWithCredential(credential)
}

// export default googleSignIn;
// // Calling this function will open Google for login.
// export async function googleLogin() {
//   try {
//     // add any configuration settings here:
//     await GoogleSignin.configure();

//     const data = await GoogleSignin.signIn();

//     // create a new firebase credential with the token
//     const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
//     // login with credential
//     const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);

//     console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));
//   } catch (e) {
//     console.error(e);
//   }
// }
// export default function googleSignIn({navigation}) {

//     // Somewhere in your code
//     signIn = async () => {
//         try {
//           await GoogleSignin.hasPlayServices();
//           const userInfo = await GoogleSignin.signIn();
//           this.setState({ userInfo });
//         } catch (error) {
//           if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//             // user cancelled the login flow
//           } else if (error.code === statusCodes.IN_PROGRESS) {
//             // operation (e.g. sign in) is in progress already
//           } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//             // play services not available or outdated
//           } else {
//             // some other error happened
//           }
//         }
//       };
// }

