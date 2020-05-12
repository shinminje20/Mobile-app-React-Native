import {Platform} from 'react-native'
import {db, auth, FacebookAuthProvider, GoogleAuthProvider} from 'f-core/src/config/firebase'
import {AccessToken, LoginManager} from 'react-native-fbsdk'
import {GoogleSignin} from '@react-native-community/google-signin'
import messaging from '@react-native-firebase/messaging'

const mobileUserModel = {
  state: {},
  reducers: {},
  actions: ({dispatch, getState}) => ({
    async getNotificationToken() {
      if (Platform.OS === 'ios') {
        const hasPermission = await messaging().hasPermission()
        if (hasPermission) {
          return await messaging().getToken()
        }
      } else {
        return await messaging().getToken()
      }
    },
    subscribeNotificationTokenRefresh(onTokenRefresh) {
      return messaging().onTokenRefresh(token => {
        onTokenRefresh(token)
      })
    },
    updateFCMToken(token) {
      const uid = auth.currentUser.uid
      if (uid) {
        return db.doc(`Users/${uid}`).set(
          {
            notificationToken: token,
          },
          {merge: true},
        )
      }
      return Promise.reject('User is not logged in')
    },
    async signInWithGoogle() {
      // Add any configuration settings here:
      await GoogleSignin.configure()

      const data = await GoogleSignin.signIn()

      const res = await GoogleSignin.getTokens()

      // create a new firebase credential with the token
      const credential = GoogleAuthProvider.credential(data.idToken, res.accessToken)

      // login with credential
      return auth.signInWithCredential(credential)
    },
    async signInWithFacebook() {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error('Facebook Login Cancelled')
      }

      // get the access token
      const data = await AccessToken.getCurrentAccessToken()

      if (!data) {
        // handle this however suites the flow of your app
        throw new Error('Something went wrong obtaining the users access token')
      }

      // // create a new firebase credential with the token
      const credential = FacebookAuthProvider.credential(data.accessToken)

      // // login with credential
      return auth.signInWithCredential(credential)
    },
  }),
}

export default mobileUserModel
