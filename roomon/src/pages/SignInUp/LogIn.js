import React, { Component, useState, useEffect } from 'react';

import {Alert, StyleSheet, View, TextInput, Text, Button, ScrollView, Image, TouchableOpacity, ImageBackground} from 'react-native';
import CustomText from "../../components/widgets/CustomText";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Congratulations from "./Congratulation"
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken, ShareDialog, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import KakaoLogins from '@react-native-seoul/kakao-login';
import auth from '@react-native-firebase/auth';
import {useSelector, useDispatch} from 'react-redux'
// import userModule from "../../models"

const assestsPath = "../../../assets/";

if (!KakaoLogins) {
  console.error('Module is Not Linked');
}

const logCallback = (log, callback) => {
  console.log(log);
  callback;
};
const TOKEN_EMPTY = 'token has not fetched';
const PROFILE_EMPTY = {
  id: 'profile has not fetched',
  email: 'profile has not fetched',
  profile_image_url: '',
};


LogIn = React.memo(function LogIn(props) {

  // const {email, firstName, lastName} = useSelector(state => {
  //   state.userModule.email, state.userModule.firstName, state.userModule.lastName
  // })
  // const userModule = useSelector(state => state.userModule)

  const dispatch = useDispatch()
  
  const [isSigningIn, setIsSigningIn] = useState(false)
  // const email = useSelector(dispatch.user.getEmail)
  // const setEmailValue = email => dispatch(userModule.setEmail(email));
  // const setFirstNameValue = firstName => dispatch(userModule.setFirstName(firstName));
  // const setLastNameValue = lastName => dispatch(userModule.setLastName(lastName));

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [isFilled, setIsFilled] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false)
  const [isSigninInProgress, setIsSigninInProgress] = useState(false)

  //Google Login
  const [checkingSignedInStatus, setCheckingSignedInStatus] = useState(true)
  // const [loggedInUser, setLoggedInUser] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  //Facebook Login
  const [profile, setProfile] = useState([]);
  const [profileImage, setProfileImage] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const SHARE_LINK_CONTENT = {
    contentType: 'link',
    contentUrl: 'https://www.facebook.com/',
  };

  //Kakao Login
  const [token, setToken] = useState(TOKEN_EMPTY);
  // const [profile, setKOProfile] = useState(PROFILE_EMPTY);

  const PROFILE_EMPTY = {
    id: 'profile has not fetched',
    email: 'profile has not fetched',
    profile_image_url: '',
  };
  
  // useEffect(() => {
  //   dispatch(userModule)
  // }, [])

  useEffect(() => {
    configureGoogleSign()
  }, []);
  useEffect(()=> {
      _isSignedIn
  });

  

  // const continueWIthGoogle = () =>{
  //   console.warn("asdfjkljasdklfjlkjslkadjfkl")
  //   return ()=>navigation.navigate("ContinueGoogle");
  // }

  
//===============================Email Login=======================================

  const onEmailLogin = () => {
    
    auth()
      .createUserWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

//===============================Facebook Login=======================================
  const _signInWithFB = async () => {
  // Attempt login with permissions
    // const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    // Attempt a login using the Facebook login dialog asking for default permissions.
    const result = await LoginManager.logInWithPermissions(["public_profile", "email"])
    .then( (result) => {
      
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          setIsLoggedIn(true)
          console.log(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
    // if (result.isCancelled) {
    //   throw 'User cancelled the login process';
    // }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

//===============================Google Login=======================================

  function configureGoogleSign() {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '1037981422391-s170biidlalc8ds20n85c2g48ebmo24u.apps.googleusercontent.com',
      // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      // accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)

    })
  }

  const _signInWithGoogle = async () => {
    try {

      // Get the users ID token
      const userInfo = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

      setUserInfo( userInfo );
      setIsLoggedIn(true)
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
      
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        Alert.alert('Play services are not available')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        Alert.alert('Something else went wrong... ', error.toString())
        // some other error happened
      }
    }
  };

  const _getCurrentUserInfo = async () => {
    try {
      const info = await GoogleSignin.signInSilently();
      setUserInfo({info})
    } catch (error) {
      setUserInfo({})
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        Alert.alert('Please Sign in')
        setIsLoggedIn(false)

      } else {
        // some other error
        Alert.alert('Something else went wrong... ', error.toString())
        setIsLoggedIn(false)
      }
    }
  };

  const getGooglePlayServices = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });
      // google services are available
    } catch (err) {
      showSignInError('play services are not available');
    }
  };
  const _signOutGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
      setIsLoggedIn(false)
    } catch (error) {
      Alert.alert('Something else went wrong... ', error.toString())
      // console.error(error);
    }
  };

  //===============================Kakao Login===================================================================
  const _singInWithKO = () => {
    logCallback('Login Start', setIsSigninInProgress(true));

    KakaoLogins.login()
      .then(result => {
        // const KOCredential = auth.signInWithCustomToken(result.accessToken);

        logCallback(
          `Login Finished:${JSON.stringify(result)}`,
          setIsSigninInProgress(false),
        );

        
        setIsLoggedIn(true)
        // Sign-in the user with the credential
        return auth().signInAnonymously();
        
      })
      .catch(err => {
        if (err.code === 'E_CANCELLED_OPERATION') {
          logCallback(`Login Cancelled:${err.message}`, setIsSigninInProgress(false));
        } else {
          logCallback(
            `Login Failed:${err.code} ${err.message}`,
            setIsSigninInProgress(false),
          );
        }
      });
  };


  const _logOutKO = () => {
    logCallback('Logout Start', setLogoutLoading(true));

    KakaoLogins.logout()
      .then(result => {
        setToken(TOKEN_EMPTY);
        setProfile(PROFILE_EMPTY);
        logCallback(`Logout Finished:${result}`, setLogoutLoading(false));
      })
      .catch(erro => {
        logCallback(
          `Logout Failed:${erro.code} ${erro.message}`,
          setIsSigninInProgress(false),
        );
      });
  };

  const _getProfileKO = () => {
    logCallback('Get Profile Start', setProfileLoading(true));

    KakaoLogins.getProfile()
      .then(result => {
        setProfile(result);
        logCallback(
          `Get Profile Finished:${JSON.stringify(result)}`,
          setProfileLoading(false),
        );
      })
      .catch(err => {
        logCallback(
          `Get Profile Failed:${err.code} ${err.message}`,
          setProfileLoading(false),
        );
      });
  };

  // const {id, email, profile_image_url: photo} = profile;

  //==================================================================================================

  const _isSignedIn = async () => {
    // setIsUserSignedIn(false)
    // setCheckingSignedInStatus(true)
    // console.warn("===========1_isSignedIn============")
    const isSignedIn = await GoogleSignin.isSignedIn();
    setUserInfo({isSignedIn})
    if (isSignedIn) {
      // setIsUserSignedIn( true );
      await _getCurrentUserInfo();
    }
  };

  const handleSignInError = async error => {
    if (error.code) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        showSignInError('User cancelled the login flow.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        showSignInError('Sign in is in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        await getGooglePlayServices();
      } else {
        showSignInError(JSON.stringify(error));
      }
    } else {
      showSignInError(JSON.stringify(error));
    }
    setIsSigninInProgress(false)
  };

  const showSignInError = alertMessage => {
    Alert.alert(
      'Google Signin Error',
      alertMessage,
      [
        {
          text: 'OK'
        }
      ],
      {
        cancelable: false
      }
    );
  };


  const loginView = () => {
    const { navigation } = props;
      return (
        <>
          
          {isLoggedIn === false ? (
          <ImageBackground style={{flex: 1, resizeMode: 'cover', justifyContent: 'center'}} 
            source={require(assestsPath + 'signInBackGround.png')}>
            <KeyboardAwareScrollView style={{flex:1, height: '100%'}} extraScrollHeight={30} enableOnAndroid>
            
            <View style={ styles.container }>
    
              <View style={ {width:'100%', marginTop: 55} }>
                <View flexDirection='row' justifyContent="space-between">
                  <View style= {{width: 58, height: 58}}>
                    <Image  source={require(assestsPath + 'logo.png')}/>
                  </View>
                  <View>
                    <TouchableOpacity style={{alignItems: 'flex-end'}}
                      onPress={()=>props.navigation.navigate("Home")}
                    >
                      <Image source={require(assestsPath + 'browseAsGuest.png')}/>
                    </TouchableOpacity>
                  </View>
                </View>
                <CustomText textStyle={ {...styles.title, marginTop: 10 }} title={ 'Welcome to Roomon' }/>
              </View>
    
              <TextInput
    
                style={ [styles.textInput, {marginTop: 46, width: 340}] }
                
                placeholder="E-mail"
                placeholderTextColor="white"
                keyboardType="email-address"
                value={emailValue}
                onChangeText={ text => setEmailValue({text}) }
                // onChangeText={}
                // onSubmitEditing={ () => this.password.focus() }
              />
    
              <TextInput
                style={ [styles.textInput, {marginTop: 36, width: 340}] }
                placeholder="password"
                placeholderTextColor="white"
                // keyboardType="visible-password"
                value={passwordValue}
                // secureTextEntry="true"
                onChangeText={ text => setPasswordValue({text}) }
              />
    
              <TouchableOpacity disabled={(emailValue == "" || passwordValue == "") ? true : false}  
                        onPress={() => navigation.navigate("SignUp") }>
                        <Image style={{marginTop: 35}}  source={require(assestsPath + 'SignInBtnColor.png')}/>
              </TouchableOpacity>
    
              <View style={ {marginTop: 20 }}>
                  <TouchableOpacity 
                  // onPress={() => this.props.navigation.navigate("SignUp")}
                  >
                    <Text style={{fontFamily: 'Archivo-Medium', color: 'white'}}>Forgot Password?</Text>
                  </TouchableOpacity>
              </View>
              
              <View >
                <Image style={{marginTop: 35, marginBottom: 35}}  source={require(assestsPath + 'or.png')}/>
              </View>
                  
              <View style={{width:'52%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={_singInWithKO}>
                  <Image
                    source={require(assestsPath + 'koIcon.png')}
                  />
                </TouchableOpacity>
    
                <TouchableOpacity onPress={_signInWithFB}>
                  <Image
                    source={require(assestsPath + 'fbIcon.png')}
                  />
                </TouchableOpacity>
    
                <TouchableOpacity  onPress={_signInWithGoogle}>
                  <Image
                    source={require(assestsPath + 'goIcon.png')}
                  />
                </TouchableOpacity>
              </View>
    
              <View style={ {marginTop: 35, flexDirection: 'row'} }>
                <Text style={{color: 'white'}} >New to Roomon? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{color: 'white', fontWeight: 'bold', textDecorationLine: 'underline'}}>Sign up</Text>
                  </TouchableOpacity>
              </View>
            
            </View>
            </KeyboardAwareScrollView>
          </ImageBackground> 
          )  : (
            <Congratulations {...props} />
          )}
        </>
      )
    
  }
  
  return loginView();

  

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    // marginRight: 'auto',
    // marginLeft: 20,
    alignItems: 'center',
    // height: '100%'
    // backgroundColor: 'white',
    // marginTop: 55
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto'

  },
  button: {
    shadowColor: 'black',
    width: 254,
    height: 55,
    backgroundColor: 'grey',
    borderRadius: 27.5,
    marginVertical: 2,
    paddingVertical: 12
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  otherLoginBtn: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2,},
    shadowOpacity: 0.5,
    width: 254,
    height: 45,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#000000',
    borderRadius: 27.5,
    marginVertical: 2,
    paddingVertical: 12
  },
  textInput: {
    fontSize: 20,
    height: 40,
    paddingLeft: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#eeeeee',
  },
});

export default LogIn;